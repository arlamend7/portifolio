# TechInnov — Language Learning Platform

## Visão geral

Este projeto reúne os módulos de aprendizagem de um serviço de ensino de idiomas on-line. Os alunos percorrem programas, unidades e atividades de inglês ou francês como segunda língua. Os módulos estão sendo redesenhados para o portal acessível da plataforma, tendo a WCAG 2.1 AA como referência de projeto e testes.

O desafio vai além de apresentar um exercício. Quando o aluno termina uma atividade, a plataforma precisa registrar esse trabalho e refletir o resultado de forma consistente no progresso, nos avisos de conclusão e nos relatórios — mesmo durante a convivência entre conteúdos antigos e redesenhados.

![Visão conceitual de programas, módulos, unidades e atividades, seguida por rastreamento, progresso e relatórios.](images/module-structure-tracking.pt.svg)

Contas, perfis de usuário e agendamento são tratados separadamente em [Account Management Platform](/projects/techinnov-account-management-platform).

## Minha contribuição

A plataforma já existia quando passei a contribuir com sua evolução. Como **Desenvolvedor e Coordenador de QA**, atuei diretamente no desenvolvimento, auxiliei a equipe na implementação de funcionalidades e participei da criação de novas atividades de aprendizagem. Também modifiquei e refatorei código e processos para melhorar sua estabilidade e facilitar a manutenção.

- **Novas atividades e funcionalidades.** Criação de atividades e colaboração na implementação de novos recursos sobre a plataforma existente.
- **Refatoração e estabilidade.** Revisão e reorganização de código e processos, incluindo a montagem dos materiais de aprendizagem e a seleção da versão e do idioma adequados para cada aluno.
- **Lógica de progresso.** Desenvolvimento em C#/.NET para status das atividades, progresso dos módulos e avisos de conclusão, com regras discutidas com a equipe de produto.
- **Qualidade da entrega.** Coordenação de QA, documentação de testes e cenários Playwright para validar tanto os novos recursos quanto os comportamentos existentes após as alterações.

## Evoluir o que já existe

Criar uma atividade nova e refatorar uma existente exigem cuidados diferentes. Na criação, é preciso implementar a interação e integrá-la ao funcionamento da plataforma. Na refatoração, é preciso melhorar a estrutura sem perder comportamentos dos quais os alunos já dependem.

Minha atuação incluiu essas duas frentes. Além de desenvolver e auxiliar na implementação, trabalhei na revisão de processos para torná-los mais estáveis. O QA complementou esse trabalho, ajudando a verificar se as mudanças funcionavam como esperado e se preservavam os fluxos existentes.

## Organizando a aprendizagem por tipos reutilizáveis de atividade

Um programa começa com um teste de nivelamento e segue uma sequência de módulos. Os módulos contêm unidades, e as unidades contêm atividades: questões de múltipla escolha, preenchimento de lacunas, interações de arrastar e soltar, diálogos, quizzes e exercícios de escuta nos quais o aluno grava a própria voz. O Pronunciation Coach, descrito a seguir, acrescenta a avaliação de pronúncia com IA a essa experiência.

Trato essas atividades como tipos reutilizáveis, e não como páginas isoladas. Por exemplo, definir uma interação ou regra de validação compartilhada por tipo evita manter uma lista separada de exercícios sempre que o conteúdo muda. Isso também oferece ao QA uma base consistente para testar atividades existentes e futuras.

## Pronunciation Coach: IA aplicada à prática oral

O **Pronunciation Coach** utiliza inteligência artificial para avaliar a pronúncia e oferecer ao aluno um retorno sobre sua fala. A atividade conecta a prática oral ao feedback individual, ajudando o aluno a perceber o que precisa aprimorar no idioma.

Contribuí com **apoio técnico e revisão durante o desenvolvimento da atividade**, em colaboração com a equipe responsável pela implementação. Essa atuação ampliou minha experiência com IA aplicada à educação, acompanhando sua integração a uma experiência de aprendizagem voltada ao aluno.

## Definindo o que significa concluir

O SCORM permite a comunicação entre o conteúdo de aprendizagem e a plataforma que o hospeda. Neste projeto, o registro das atividades alimenta as visões de progresso do aluno, o status dos módulos e os relatórios. Não basta o exercício funcionar se o resultado não for registrado.

A conclusão não é igual em todos os módulos: alguns têm avaliação final; outros servem para revisão ou simulação. Pense em um aluno que terminou os exercícios, mas ainda não fez a avaliação. O módulo deve aparecer como concluído? Essa é uma decisão de produto que precisa estar clara antes de virar código.

Documentei essas situações com o status esperado para que a equipe de produto confirmasse as regras antes da implementação e dos testes. O mesmo cuidado vale quando o conteúdo é redesenhado: o progresso precisa permanecer consistente entre versões, sem desaparecer nem ser contabilizado duas vezes.

## Acessibilidade como parte da interação

Uma atividade acessível exige mais que um novo visual. Exercícios de arrastar e soltar precisam de uma forma de operação pelo teclado; o foco deve permanecer visível; e o retorno das ações precisa estar disponível às tecnologias assistivas, não apenas aparecer na tela.

Exercícios de áudio acrescentam outros cuidados. O plano de testes considera a permissão do microfone, estados claros de gravação e reprodução, diferenças entre navegadores e a preservação da tentativa após recarregar a página. Essas verificações conectam acessibilidade à confiabilidade prática da experiência de aprendizagem.

## Testando a jornada, não apenas a tela

Organizo o QA manual e os cenários Playwright por tipo de atividade, além da navegação dos módulos e das avaliações. As verificações cobrem tanto a interação quanto sua integração com o rastreamento: depois de terminar uma atividade, o aluno vê o progresso esperado?

A documentação compartilhada reúne verificações de funcionalidade, acessibilidade, idioma, layout responsivo e regressão. A automação ajuda a repeti-las de forma consistente; não substitui a avaliação manual de acessibilidade nem comprova cobertura completa.

## Tecnologias e práticas

Angular · TypeScript · C# · .NET · Entity Framework · SQL Server · SCORM · gravação de áudio no navegador · Playwright · critérios WCAG 2.1 AA · localização em inglês e francês.

## O que este projeto demonstra

Minha contribuição reúne desenvolvimento de novas atividades e funcionalidades, apoio à implementação e refatoração de código e processos de uma plataforma existente. A coordenação de QA complementa essa atuação: ajuda a validar as mudanças e a preservar a experiência de aprendizagem enquanto o produto evolui.
