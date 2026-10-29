## Sistemas mais rápidos, com resultados confiáveis

Uma tela lenta nem sempre significa uma interface lenta. A demora pode estar em uma API, na lógica da aplicação, em uma consulta ao banco ou em um serviço externo. Meu primeiro passo é identificar onde o tempo está sendo gasto antes de decidir o que mudar.

Atuar na interface, no backend e no banco de dados me ajuda a acompanhar a requisição inteira. Minha experiência em QA também orienta esse trabalho: melhorar a velocidade importa, mas verificar se o usuário continua recebendo as informações corretas é igualmente necessário.

## Um exemplo prático: fazer menos trabalho sobre milhões de registros

Uma listagem com pesquisa utilizava uma tabela com milhões de registros. Para apresentar cada resultado, a consulta reunia informações de tabelas relacionadas e calculava campos adicionais, como totais e status.

O custo estava no volume de dados processado. A abordagem original acrescentava detalhes a um grande conjunto de registros antes de restringi-lo aos resultados necessários. Boa parte desse processamento era descartada, pois a tela exibia apenas uma página.

Mudei a abordagem para concentrar o trabalho mais caro em um conjunto menor:

1. **Encontrar os registros correspondentes.** Aplicar os critérios de pesquisa antes de carregar detalhes desnecessários para identificar os resultados.
2. **Selecionar a página.** Manter os identificadores dos registros a exibir, respeitando a ordenação necessária.
3. **Acrescentar os detalhes.** Buscar as informações relacionadas e calcular os campos restantes para esses registros.

É como preparar um relatório a partir de um grande arquivo: primeiro encontrar as pastas necessárias e depois reunir seus detalhes, em vez de preparar um relatório completo para cada pasta existente.

![Comparação entre uma consulta que acrescenta detalhes a muitos registros antes de filtrar e outra que filtra e seleciona uma página antes de buscar seus detalhes.](images/filter-first.pt.svg)

Nesse caso, o tempo de execução caiu aproximadamente **99%, mantendo os mesmos dados no resultado**. É um resultado daquela consulta específica, não uma promessa para qualquer sistema.

A mudança também reduziu a dependência de índices para manter a consulta utilizável. Um índice ajuda a localizar registros, como o índice de um livro, mas tem custos de armazenamento e atualização. A lição foi eliminar trabalho desnecessário primeiro e avaliar os índices conforme a carga real, não deixar de utilizá-los.

Essa abordagem exige cuidado: se um dado relacionado define se o registro atende à pesquisa ou sua posição na ordenação, ele precisa ser considerado antes de selecionar a página. Caso contrário, uma consulta mais rápida pode devolver resultados incorretos.

## Como reduzo o trabalho desnecessário

Aplico o mesmo raciocínio a APIs, telas e processos em segundo plano. O objetivo é evitar trabalho repetido e movimentar apenas os dados necessários para a tarefa.

| Decisão | O que muda na prática |
| --- | --- |
| Validar a entrada cedo | Rejeitar requisições inválidas antes do processamento caro, mantendo a validação definitiva no servidor. |
| Preparar a requisição | Normalizar os dados de entrada e reunir o contexto necessário, evitando buscas repetidas. |
| Verificar permissões no nível adequado | Reaproveitar verificações comuns quando possível, preservando as regras específicas de cada registro. |
| Agrupar trabalhos independentes | Processar conjuntos de registros e usar paralelismo controlado quando as dependências e a capacidade permitirem. |
| Filtrar perto da origem | Evitar carregar uma base inteira quando são necessárias apenas algumas linhas ou campos. |
| Preparar a resposta com critério | Escolher onde calcular cada informação conforme sua finalidade, o volume de dados e o custo medido. |

Também procuro criar requisições reutilizáveis, capazes de atender a mais de uma tela por meio de parâmetros claros. Reutilizar deve simplificar uma funcionalidade, não criar um endpoint que carregue tudo para todos. O mesmo vale para o código: separo acesso a dados, regras de negócio e apresentação sem fragmentar desnecessariamente uma operação simples.

## Como isso aparece em cada parte do sistema

### Banco de dados: reduzir cálculos repetidos

Já substituí cálculos executados separadamente para cada registro por operações sobre um conjunto de linhas. Também reviso subconsultas que dependem de cada linha do resultado, comparando-as com junções ou totais agrupados quando essas alternativas reduzem o trabalho.

Em procedimentos armazenados complexos — programas salvos no banco — procuro condições acumuladas que dificultam a otimização. Consultas mais específicas podem tornar a execução mais fácil de compreender e ajustar.

Tabelas temporárias são outra opção quando o banco precisa de informações melhores sobre resultados intermediários. As estatísticas do SQL Server ajudam a estimar volumes e escolher um plano de execução. Variáveis de tabela não possuem estatísticas de distribuição por coluna, embora recursos mais recentes melhorem suas estimativas de quantidade de linhas. Avalio o plano e a carga de trabalho, sem presumir que uma estrutura seja sempre melhor.

### Backend: tornar o acesso a dados explícito

Com ferramentas como o Entity Framework, o código pode esconder quando uma consulta é executada ou quantos dados ela carrega. Torno essa divisão explícita: filtrar no banco quando adequado, buscar somente os campos úteis e separar o acesso a dados das regras de negócio.

Valores destinados à apresentação, como rótulos formatados, muitas vezes podem ser preparados na API. Cálculos necessários para filtros, ordenação ou agregação podem pertencer ao banco. A escolha acompanha a operação, não uma regra absoluta sobre qual camada é mais rápida.

### Interface: carregar o que o usuário precisa

Uma tela não precisa buscar tudo ao abrir. Adio o carregamento de dados usados por ações ocasionais e limito as requisições ao escopo visível, como o período exibido em um calendário.

Componentes de entrada compartilhados identificam problemas de formatação cedo. Textos de referência estáveis podem ser gerados antecipadamente quando não exigem uma consulta em tempo de execução. Essas escolhas evitam requisições desnecessárias e deixam a primeira interação mais leve.

## Código legível torna o trabalho caro mais visível

Estudar DDD, SOLID e Object Calisthenics, além de técnicas como objetos literais e closures, influenciou minha forma de organizar o código. Uma lição que tiro desse aprendizado é que entender uma função significa compreender tanto seu propósito quanto o crescimento do trabalho que ela executa ao receber mais dados. Essas abordagens ajudam a pensar no projeto do código; não o tornam automaticamente mais rápido.

A complexidade algorítmica, frequentemente representada pela **notação Big O**, descreve esse crescimento, não um tempo exato de execução. Em um trabalho **O(n)**, dobrar a quantidade de itens tende a dobrar o trabalho. Em **O(n²)**, ele pode aproximadamente quadruplicar. Por exemplo, comparar cada item com todos os demais pode ficar caro conforme uma lista cresce, mesmo que pareça instantâneo em uma amostra pequena.

Por isso, procuro buscas repetidas, laços dentro de laços e chamadas ao banco escondidas no processamento de cada item. Também evito aninhamentos desnecessários para manter o caminho de execução claro. A indentação, por si só, não determina a complexidade: uma expressão curta pode esconder trabalho caro, enquanto condições aninhadas podem ter baixo custo.

Não aplico essas ideias de forma rígida. Uma solução quadrática simples pode ser adequada para uma entrada pequena e limitada. A decisão depende do volume esperado, das medições reais e do custo de uma alternativa mais complexa.

A legibilidade continua essencial em qualquer caso. Nomes claros, responsabilidades explícitas e um caminho de execução visível ajudam o próximo desenvolvedor a entender a intenção antes de alterar o código. Quando uma escolha envolve um custo de desempenho, quero que ela esteja explicada, não escondida em uma implementação difícil de acompanhar.

## Confirmar que a melhoria é segura

Antes de alterar um processo, registro seu desempenho atual e os resultados esperados. Depois, comparo os dois aspectos: o tempo necessário e as informações retornadas em condições equivalentes.

Testes de regressão, critérios de aceitação claros e evidências documentadas conectam o trabalho de desempenho ao QA. O objetivo é um sistema que responda mais rápido, preserve suas regras de negócio e continue compreensível para quem for mantê-lo depois.

### Referências técnicas

- [Microsoft: consultas eficientes com Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying)
- [Microsoft: compilação adiada de variáveis de tabela](https://learn.microsoft.com/en-us/sql/relational-databases/performance/intelligent-query-processing-details#table-variable-deferred-compilation)
