# GFT — Plataforma de vendas de seguros de vida

## Visão geral

O projeto começou com um objetivo específico: permitir que empresas parceiras vendessem um produto de seguro por meio de uma aplicação web. Com o tempo, passou a exigir múltiplos provedores, atendimento a pessoas físicas e jurídicas, autenticação entre sistemas parceiros e envio de relatórios a um banco nacional.

Minha atuação cresceu junto com esses requisitos. Depois que a equipe de arquitetura original foi direcionada a outro projeto, propus mudanças técnicas e trabalhei com a equipe de desenvolvimento para avaliá-las e implementá-las. O desafio central era abrir espaço para novas necessidades do negócio, preservando as funcionalidades que já estavam em uso.

O resultado mais importante foi o reaproveitamento entre etapas. Os módulos de integração e os formulários dinâmicos criados para atender várias seguradoras depois sustentaram as vendas corporativas. Um fluxo dedicado de autenticação e redirecionamento organizou a entrada dos parceiros, enquanto um processamento separado de relatórios ampliou o uso da infraestrutura Azure existente.

![Visão da arquitetura: parceiros entram pelo SSO; aplicações Angular usam um backend .NET em Azure Functions, com integrações de provedores, Cosmos DB, Key Vault e contexto privado no Redis. Um fluxo separado processa alterações de contratos e produz arquivos bancários.](images/architecture-overview.pt.svg)

### Como a plataforma funciona

- **Entrada por um parceiro.** A aplicação de SSO e redirecionamento identifica o parceiro de origem, coordena a autenticação e direciona o usuário à aplicação de vendas adequada.
- **Realização da venda.** Os formulários Angular se adaptam à pessoa física ou jurídica e ao provedor selecionado. O backend .NET, executado em Azure Functions, aplica regras comuns e delega as operações específicas ao módulo correspondente.
- **Separação entre dados e credenciais.** O Cosmos DB armazena informações dos contratos, o Key Vault guarda credenciais dos provedores e o Redis mantém temporariamente o contexto necessário para continuar o fluxo entre aplicações.
- **Reporte de alterações dos contratos.** Um trigger do Cosmos DB e uma Azure Function iniciam um fluxo separado. O trabalho em fila é processado para gerar arquivos posicionais da integração bancária.

*O diagrama mostra as principais responsabilidades e interações. É uma visão conceitual, não uma topologia de implantação ou de rede.*

## Atender mais provedores sem duplicar a plataforma

A primeira versão utilizava Angular, .NET com Azure Functions e Cosmos DB. Em menos de dois meses da fase inicial, o escopo se expandiu para múltiplos provedores de seguros. Cada um tinha seu próprio contrato de integração, credenciais, campos obrigatórios e regras de validação.

Repetir um formulário e um backend concebidos para um único produto aumentaria o volume de código a manter a cada novo provedor. Propus separar as operações comuns da plataforma dos detalhes específicos de cada integração.

Um handler compartilhado recebe a requisição, identifica o provedor e aplica as regras comuns. Em seguida, chama o módulo do provedor por uma interface compartilhada: um contrato que define operações como obter as informações exigidas, enviar uma solicitação, pagar e confirmar. Cada módulo implementa essas operações conforme a API do seu provedor.

![Integração com provedores: valores predefinidos alimentam um resolvedor comum. Uma interface compartilhada o conecta a módulos e APIs independentes, com Cosmos DB para dados e Key Vault para credenciais.](images/provider-modules.pt.svg)

O smart enum agrupa identificadores de provedores e valores predefinidos de integração; as credenciais confidenciais permanecem no Key Vault. No frontend, formulários dinâmicos substituíram o formulário estático original, permitindo adaptar os campos ao provedor e ao fluxo de negócio.

A equipe avaliou e implementou essa abordagem. Ela deu às novas integrações um lugar definido no sistema e reduziu a necessidade de duplicar comportamentos comuns ou alterar módulos de outros provedores.

## Continuar a jornada do cliente com segurança entre sistemas

As vendas para pessoas jurídicas trouxeram campos e regras de negócio diferentes. O investimento anterior em módulos e formulários dinâmicos permitiu reaproveitar essa base. O novo problema era levar o usuário de um parceiro externo à aplicação correta, com as informações necessárias para continuar.

Essas informações podiam incluir a empresa de origem, os dados do vendedor e os dados do cliente usados para preencher um formulário. Transportá-las diretamente em uma URL pública exporia informações que deveriam circular por uma comunicação controlada entre backends.

Propus um integrador de SSO e um handler de redirecionamento dedicados, com aplicações frontend e backend separadas. Após resolver a autenticação e o contexto do parceiro, a solução armazenava esse contexto temporariamente no Redis, em uma rede privada. O navegador recebia uma chave de referência. O backend de destino utilizava essa chave, suas próprias credenciais e verificações de autorização para recuperar as informações.

Assim, as aplicações passaram a contar com um fluxo comum de entrada e resolução de contexto, sem precisar implementar individualmente a autenticação e o redirecionamento de parceiros.

## Transformar alterações de contratos em relatórios bancários consistentes

A integração seguinte exigia informar ao banco os contratos confirmados, validados e cancelados. Ampliamos o sistema com um trigger do Cosmos DB e uma Azure Function, mantendo o processamento de relatórios separado do fluxo principal de vendas.

A dificuldade estava no contrato dos arquivos. Em um arquivo posicional, cada campo deve ocupar uma posição e um tamanho exatos. Formatar um valor corretamente pode exigir preenchimento, truncamento, conversão numérica ou remoção de acentos. Arquivos semanais e mensais também precisavam representar informações relacionadas dos contratos de maneira consistente, mesmo sendo gerados em momentos diferentes.

Propus e implementei um módulo dedicado à formatação, aplicando princípios de DDD para manter essas regras reunidas. As transformações comuns podiam ser reutilizadas, enquanto cada layout preservava suas exigências específicas. Isso tornou a lógica de formatação mais fácil de compreender do que regras espalhadas pelo fluxo de integração.

A correção dependia dos dois níveis: cada campo precisava cumprir sua especificação, e os arquivos relacionados precisavam concordar sobre os dados dos contratos.

## O que este projeto demonstra

A integração bancária foi entregue, e a instituição solicitou documentação técnica como referência para outras empresas. A equipe também foi convidada a explicar a arquitetura e a abordagem de implementação.

Para mim, o principal aprendizado foi perceber como decisões de arquitetura se acumulam. Separar o trabalho específico de cada provedor ajudou a atender às vendas corporativas depois; isolar autenticação e relatórios deu uma responsabilidade clara a cada fluxo. Minha contribuição combinou implementação prática, a proposta dessas separações e o alinhamento com a equipe sobre como construí-las.

### Créditos dos ícones

Ícones de Azure Functions, Cosmos DB e Key Vault: [Microsoft Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/icons/). As cores oficiais dos produtos foram preservadas. Componentes genéricos não indicam um produto de nuvem específico.
