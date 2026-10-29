# Revisão editorial — negócio e engenharia

## Objetivo

Ajudar recrutadores, clientes e profissionais de engenharia a entender a contribuição de Arlan, mesmo sem uma apresentação oral. Revisão baseada nos relatos do próprio autor; não se trata de validação externa dos projetos.

## Diagnóstico e decisões

- O texto anterior enumerava tecnologias e repetia afirmações sobre clareza sem desenvolver os exemplos.
- A abertura agora responde ao que Arlan faz. O caso do CMS vem antes das reflexões e explicita público, necessidade e material produzido.
- Uma única tabela compara as duas formas de documentação. A tabela que repetia exemplos foi removida.
- O diagrama genérico foi retirado da leitura, mas os SVGs foram preservados. Um desenho de arquitetura ou fluxo real, autorizado e anonimizado, seria uma evidência melhor quando estiver disponível.
- SCORM, SSO e middleware foram retirados desta página para evitar uma lista de siglas sem contexto. Não foram excluídos do histórico profissional.
- Os termos que permanecem são explicados no contexto. Não há afirmação de implementação, redução de retrabalho ou métricas não confirmadas.
- Inglês e francês seguem a mesma estrutura e os mesmos fatos do português.

## Pesquisa e limites

Consultas em 28/10/2026. As orientações sobre portfólios abaixo tratam de UX; a aplicação ao portfólio de engenharia é uma decisão editorial, não evidência específica sobre recrutamento de engenheiros.

- [NN/g — Plain Language Is for Everyone, Even Experts](https://www.nngroup.com/articles/plain-language-experts/): linguagem familiar, concisão e hierarquia também ajudam leitores especializados.
- [NN/g — Technical Jargon](https://www.nngroup.com/articles/technical-jargon/): decidir se o termo técnico é necessário e contextualizá-lo quando parte do público não o conhece.
- [NN/g — 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/): explicitar problema, papel e colaboração; priorizar exemplos relevantes e leitura rápida.
- [Google — UX design portfolio tips](https://services.google.com/fh/files/misc/ux_design_portfolio_tips_19.pdf): fornecer contexto suficiente para compreender a contribuição sem apresentação oral.
- [Home Office — Write effective documentation](https://engineering.homeoffice.gov.uk/patterns/write-effective-documentation/): partir do que o leitor precisa entender ou fazer, priorizar informações e explicar siglas.
- [GOV.UK Design System — Images](https://design-system.service.gov.uk/styles/images/): imagens como apoio; o texto deve preservar as informações necessárias.

## Próximo enriquecimento possível

Se o autor confirmar a necessidade original do sistema de e-mails e o desfecho da proposta, acrescentar essas informações ao exemplo. Não inventar uma história completa para preencher as lacunas. A revisão foi editorial; não houve teste de compreensão com leitores externos.

## Atualização após revisão do autor

Os documentos agora desenvolvem os detalhes confirmados pelo autor: responsabilidades dos microserviços, limites de integração com o sistema existente, tipos de serviços de nuvem e a analogia postal usada no caso do SendGrid. A narrativa foi ampliada para explicar contexto, atuação e propósito de cada exemplo. A frase incompleta sobre serviços semelhantes não foi completada por suposição.

Verificação técnica: a [referência oficial de eventos do SendGrid](https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/event) distingue processamento, entrega, adiamento e falhas. O texto apresenta a fila como analogia e não atribui ao serviço uma garantia universal de ordem FIFO ou de entrega de todas as mensagens. Não afirma que apenas esperar resolve qualquer causa de atraso.

Revisão editorial: parágrafos com uma ideia central; termos técnicos explicados no contexto; uma tabela comparativa; mesmos fatos e limites em PT, EN e FR. Não há afirmação de implementação da proposta ou métricas não confirmadas.
