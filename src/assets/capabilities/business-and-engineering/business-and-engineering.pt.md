Uma parte importante do meu trabalho acontece nas conversas entre quem precisa de uma solução e quem vai construí-la. Clientes, responsáveis pelo produto e desenvolvedores podem estar falando sobre o mesmo sistema, mas trazer conhecimentos e preocupações diferentes.

Ajudo a conectar essas perspectivas: compreender a necessidade de negócio, organizar as informações e explicar o funcionamento técnico de uma maneira que faça sentido para quem está ouvindo. Para isso, utilizo exemplos do cotidiano, metáforas e documentação adaptada ao público.

## A mesma solução precisa responder a perguntas diferentes

Ao propor um sistema de envio de e-mails utilizando um CMS, uma ferramenta de gestão de conteúdo, precisei apresentar a solução para dois públicos: a equipe que iria desenvolvê-la e os funcionários que iriam utilizá-la.

Para a equipe técnica, era necessário explicar como a proposta se encaixaria no sistema existente. Detalhei a arquitetura de microserviços — serviços com responsabilidades definidas que trabalham em conjunto — e o papel de cada um. Também documentei os pontos de integração: onde começaria a atuação da nova solução, onde terminaria e como ela se conectaria ao sistema atual. A proposta incluía os tipos de serviços de nuvem previstos para compor a solução.

O desenho de arquitetura ajudava a acompanhar essas relações. Além de identificar as tecnologias, eu precisava mostrar a função de cada parte e como elas trabalhariam juntas, oferecendo uma base para discutir a implementação.

Para os funcionários, a explicação precisava responder a outra pergunta: como essa solução seria utilizada no trabalho? Preparei uma apresentação voltada ao uso e representei o processo em BPMN, uma forma visual de mostrar atividades e o fluxo entre elas. O foco era permitir que acompanhassem o processo sem precisar conhecer a estrutura interna do sistema.

| Público | Pergunta principal | Material preparado |
| --- | --- | --- |
| Equipe técnica | Como construir e integrar a solução? | Documentação técnica e desenho de arquitetura |
| Funcionários | Como utilizar a solução no trabalho? | Explicação de uso e fluxo de atividades |

As duas explicações tratavam da mesma proposta, mas começavam por perguntas diferentes. Esse é um cuidado que tenho ao documentar: escolher o conteúdo e o nível de detalhe a partir do que cada pessoa precisa compreender.

## Usar algo conhecido para explicar algo novo

Em outra situação, precisei explicar um acúmulo de e-mails pendentes de envio. Nosso sistema utilizava o SendGrid, um serviço de envio de e-mails, por meio do protocolo SMTP. Era importante esclarecer a diferença entre entregar uma mensagem ao serviço e ela efetivamente seguir para o destino.

Utilizei o funcionamento dos correios como metáfora: nosso sistema preparava a carta e a colocava no correio; o SendGrid ficava responsável por encaminhá-la. Entregar a carta ao correio, porém, não significava que ela já havia chegado ao destinatário.

Para representar o acúmulo, comparei o processamento a uma fila de atendimento. Na analogia, acrescentar mais dez ou mais cem cartas não eliminava as que já estavam aguardando. Essa era uma simplificação para explicar o atraso, não uma descrição exata da ordem de entrega do serviço.

A comparação ajudava a mostrar por que interromper novos envios não normalizaria tudo imediatamente: isso poderia conter o crescimento da fila, mas as mensagens pendentes ainda precisariam ser processadas. A explicação distinguia o que nosso sistema já havia solicitado daquilo que o serviço ainda precisava concluir.

![Analogia do envio de e-mails com os correios: nosso sistema solicita o envio, o SendGrid processa as mensagens pendentes e as encaminha ao destinatário. Acrescentar mensagens não elimina o acúmulo, e pausar novos envios não esvazia a fila. A ordem e o prazo de entrega podem variar.](images/smtp-postal-analogy.pt.png)

Esse é o papel que procuro dar às analogias: criar um ponto de partida familiar e, a partir dele, explicar os detalhes técnicos necessários à situação.

## A comunicação acontece nos dois sentidos

A necessidade de adaptar a linguagem também existe dentro das equipes técnicas. Um desenvolvedor iniciante e um arquiteto podem partir de experiências diferentes. Desenvolvimento, qualidade e infraestrutura também observam um problema a partir de responsabilidades distintas.

Frequentemente, atuo como um ponto de conexão entre essas pessoas. Ajudo quem está mais próximo do negócio a organizar suas necessidades de forma mais sistemática e incentivo os profissionais técnicos a explicar seu raciocínio sem depender apenas dos termos da própria área.

O que observo nessas conversas é uma melhor percepção de como se comunicar: o que precisa ser explicado e qual linguagem facilita o entendimento.

Para mim, clareza faz parte do trabalho técnico. Procuro participar da construção da solução e ajudar as pessoas envolvidas a compreender o que estamos construindo, por que aquilo é necessário e como será utilizado.
