# TechInnov — Account Management Platform

## Visão geral

Esta plataforma é o portal de um serviço de ensino on-line. É por ela que alunos, tutores, coordenadores e administradores acessam o sistema, gerenciam suas contas, agendam sessões, acompanham o progresso e recebem relatórios. Cada perfil vê um conjunto diferente de telas e permissões, e toda a experiência precisa funcionar em inglês, francês e chinês tradicional.

Dois portais convivem. O **portal existente** reúne fluxos consolidados, construídos em .NET Framework e MVC. O **portal acessível** é a experiência moderna e acessível para a qual a plataforma está evoluindo. O desafio central é manter os fluxos existentes confiáveis enquanto as experiências migram gradualmente para o portal acessível, sem interromper quem usa a plataforma todos os dias.

![Visão conceitual dos perfis, dois portais, serviços compartilhados, dados e relatórios.](images/platform-overview.pt.svg)

## Minha contribuição

Como **Desenvolvedor e Coordenador de QA**, conecto a implementação ao trabalho necessário para entregá-la com confiança. Desenvolvo em Angular, C#/.NET e SQL Server, coordeno testes manuais e automatizados e transformo necessidades de negócio em propostas que o cliente consegue avaliar.

Isso inclui esclarecer o escopo, estimar mudanças maiores e documentar decisões para que desenvolvedores, testadores e pessoas do negócio compartilhem o mesmo entendimento.

## Levando experiências para um portal acessível

Trazer as experiências dos tutores para o portal acessível é um esforço em várias etapas. Contribuí para estimar essa transição e definir seu escopo: quais telas migram primeiro, quais dependências bloqueiam outras e como manter os dois portais coerentes durante o processo.

Uma decisão recorrente era se o usuário seria redirecionado para páginas do portal antigo ou se a experiência seria construída diretamente no portal acessível. Recomendei construir diretamente no portal acessível sempre que possível. O redirecionamento é mais rápido no curto prazo, mas cria uma experiência misturada para o usuário e obriga a manter a mesma jornada em dois lugares.

A acessibilidade faz parte da definição de cada funcionalidade, e não é uma etapa de acabamento. As visões de calendário, por exemplo, são definidas separadamente para alunos e tutores, com requisitos de acessibilidade incluídos desde o início.

## Regras de agendamento consistentes entre perfis e fusos horários

Visto de fora, o agendamento parece simples, mas as regras se influenciam. Reagendamentos e cancelamentos dependem da proximidade da sessão, a virada do mês afeta a contagem de sessões, e alunos e tutores podem estar em fusos horários diferentes.

Antes de alterar esses fluxos, investiguei como a implementação legada se comportava de fato, para que a refatoração preservasse as regras das quais os usuários já dependiam.

## Melhorando a consulta de dados

Em uma tela que consultava milhões de registros, reduzi o tempo de execução da consulta em aproximadamente **99% naquele caso específico**. Em vez de preparar todos os detalhes antes de restringir os resultados, reorganizei a consulta para filtrar primeiro e enriquecer apenas as linhas necessárias.

Esse resultado se refere a uma consulta, não à plataforma inteira. A abordagem e suas implicações estão descritas em [Engenharia focada em desempenho](/capabilities/performance-engineering).

## Qualidade como parte da entrega

Uma funcionalidade não está pronta apenas porque o código foi escrito. A equipe também precisa saber o que foi verificado, quais dúvidas permanecem e quem deve validar o resultado. Documentei o processo de entrega e criei modelos reutilizáveis de QA para tornar essas expectativas claras.

Com Playwright, ajudo a organizar testes de regressão, que verificam se uma mudança afetou comportamentos existentes, e testes de smoke, verificações menores dos fluxos essenciais. Os cenários consideram perfis de usuário, tamanhos de tela, idiomas e navegação por teclado. A automação apoia esse trabalho; não substitui a avaliação manual de acessibilidade.

![A entrega parte do entendimento da necessidade e passa por desenvolvimento, revisão, testes e validação. Evidências de teste e documentação apoiam todo o processo.](images/delivery-quality-flow.pt.svg)

Também analiso relatórios de testes e comparo a implementação com a documentação para identificar lacunas. O objetivo é tornar a qualidade visível por meio de evidências, sem presumir que uma execução bem-sucedida significa cobertura completa.

## Tecnologias e práticas

Angular · TypeScript · C# · .NET / .NET Framework · ASP.NET MVC · Entity Framework · SQL Server · Playwright · WCAG · SCORM · iTextSharp.

## O que este projeto demonstra

Minha contribuição reúne desenvolvimento, análise de desempenho, acessibilidade e coordenação de QA. O desafio central é melhorar uma plataforma consolidada preservando os comportamentos dos quais as pessoas já dependem — e dar à equipe contexto suficiente para continuar evoluindo o produto.
