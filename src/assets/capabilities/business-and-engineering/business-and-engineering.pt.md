Grande parte do meu trabalho acontece entre as pessoas que precisam de uma solução e as que a constroem. Clientes, responsáveis pelo produto e desenvolvedores podem estar discutindo o mesmo sistema, mas trazer conhecimentos e preocupações diferentes.

Ajudo a conectar essas perspectivas: compreender a necessidade de negócio, organizar as informações e explicar os aspectos técnicos de uma maneira que faça sentido para quem está ouvindo. Utilizo exemplos do cotidiano, metáforas e documentação adaptada ao público.

## A mesma solução precisa responder a perguntas diferentes

Ao propor um sistema de envio de e-mails utilizando um CMS, uma ferramenta de gestão de conteúdo, precisei apresentar a solução para dois públicos: a equipe que iria desenvolvê-la e os funcionários que iriam utilizá-la.

Para a equipe técnica, era necessário explicar como a proposta se encaixaria no sistema existente. Descrevi a arquitetura de microserviços — serviços com responsabilidades definidas que trabalham em conjunto — e o papel de cada serviço. Também documentei os pontos de integração: onde começariam e terminariam as responsabilidades da nova solução e como ela se conectaria ao sistema atual.

O desenho de arquitetura ajudava a acompanhar essas relações. Além de identificar as tecnologias, mostrei a função de cada parte e como elas trabalhariam juntas, oferecendo uma base para discutir a implementação.

Para os funcionários, a explicação precisava responder a outra pergunta: como utilizariam essa solução no trabalho? Preparei uma apresentação voltada ao uso e representei o processo em BPMN, uma forma visual de mostrar atividades e o fluxo entre elas. O objetivo era permitir que acompanhassem o processo sem precisar conhecer a estrutura interna do sistema.

| Público | Pergunta principal | Material preparado |
| --- | --- | --- |
| Equipe técnica | Como construir e integrar a solução? | Documentação técnica e desenho de arquitetura |
| Usuários finais | Como utilizar a solução no trabalho? | Explicação de uso e fluxo de atividades |

As duas explicações descreviam a mesma proposta, mas partiam de perguntas diferentes. Isso ofereceu a cada grupo o que precisava para avaliar a proposta antes do início do desenvolvimento. É uma escolha que faço sempre que documento: selecionar o conteúdo e o nível de detalhe de acordo com o que cada pessoa precisa compreender.

## Usar algo conhecido para explicar algo novo

Em outra situação, precisei explicar como funciona a entrega de e-mails depois que nosso sistema encaminha as mensagens ao serviço de envio. Nosso sistema utilizava o SendGrid, um serviço de envio de e-mails, por meio do protocolo SMTP. A distinção principal era entre entregar uma mensagem ao serviço e essa mensagem chegar ao destino.

Utilizei o funcionamento dos correios como metáfora: nosso sistema prepara uma carta e a entrega ao correio; o SendGrid a encaminha. Entregar a carta ao correio, porém, não significa que ela chegou ao destinatário.

Também comparei o processamento a uma fila: acrescentar mais cartas não acelera as que já estão aguardando, e pausar a entrada de novas cartas não esvazia a fila imediatamente. Era uma simplificação, não uma descrição exata da ordem de entrega do serviço, mas oferecia a todos uma referência comum sobre o que nosso sistema controla e o que o serviço faz depois.

![Analogia postal: nosso sistema encaminha mensagens ao SendGrid, que as processa e as envia aos destinatários. Encaminhar uma mensagem ao serviço não é o mesmo que entregá-la; a ordem e o prazo de entrega podem variar.](images/smtp-postal-analogy.pt.svg)

Com esse entendimento compartilhado, a conversa podia avançar do funcionamento do serviço para o que fazer em seguida. É assim que utilizo analogias: para estabelecer um ponto de partida familiar e, a partir dele, explicar os detalhes técnicos necessários à situação.

## A comunicação acontece nos dois sentidos

Adaptar a linguagem também é importante dentro das equipes técnicas. Um desenvolvedor iniciante e um arquiteto podem partir de experiências diferentes. As equipes de desenvolvimento, qualidade e infraestrutura também observam um problema a partir de responsabilidades distintas.

Frequentemente, atuo como um ponto de conexão entre essas pessoas. Com os clientes, transformo necessidades em propostas com casos de uso e diagramas, permitindo validar decisões antes do início do desenvolvimento. Dentro da equipe, escrevo documentação de qualidade e de processos para que desenvolvedores, profissionais de testes e infraestrutura trabalhem a partir da mesma referência. Também incentivo os profissionais técnicos a explicar seu raciocínio sem depender apenas dos termos da própria área.

Essas conversas continuam me ensinando o que precisa ser explicado e quais palavras facilitam o entendimento.

Para mim, clareza faz parte do trabalho técnico. Procuro contribuir para a construção da solução e ajudar as pessoas envolvidas a compreender o que estamos construindo, por que aquilo é necessário e como será utilizado.
