Much of my work happens between the people who need a solution and the people who build it. Clients, product owners and developers may be discussing the same system while bringing different knowledge and concerns.

I help connect these perspectives: understanding the business need, organizing information and explaining the technical aspects in a way that makes sense to the listener. I use everyday examples, metaphors and documentation adapted to the audience.

## The same solution needs to answer different questions

When proposing an email delivery system using a CMS, a content management tool, I needed to present the solution to two audiences: the team who would develop it and the staff who would use it.

For the technical team, I needed to explain how the proposal would fit into the existing system. I described the microservices architecture — services with defined responsibilities working together — and the role of each service. I also documented the integration points: where the new solution's responsibilities would begin and end, and how it would connect to the current system.

The architecture diagram helped readers follow these relationships. Alongside identifying the technologies, I showed what each part would do and how the parts would work together, providing a basis for discussing implementation.

For the staff, the explanation needed to answer a different question: how would they use this solution at work? I prepared a presentation focused on usage and represented the process in BPMN, a visual way to show activities and the flow between them. The aim was to let them follow the process without needing to understand the system's internal structure.

| Audience | Main question | Material prepared |
| --- | --- | --- |
| Technical team | How do we build and integrate the solution? | Technical documentation and an architecture diagram |
| End users | How do we use the solution at work? | Usage explanation and an activity flow |

Both explanations described the same proposal but started from different questions. This gave each group what it needed to evaluate the proposal before development began. It is a choice I make whenever I document: selecting the content and level of detail according to what each person needs to understand.

## Using something familiar to explain something new

In another situation, I needed to explain how email delivery works once our system hands messages off. Our system used SendGrid, an email delivery service, through the SMTP protocol. The key distinction was between handing a message to the service and that message reaching its destination.

I used the postal service as a metaphor: our system prepares a letter and hands it to the post office; SendGrid forwards it. Handing the letter over, however, does not mean it has reached its recipient.

I also compared processing to a queue: adding more letters does not speed up those already waiting, and pausing new letters does not empty the queue right away. This was a simplification rather than an exact description of the service's delivery order, but it gave everyone a shared picture of what our system controls and what the service handles afterward.

![Postal analogy: our system hands messages to SendGrid, which processes them and forwards them to recipients. Handing a message over is not the same as delivering it; delivery order and timing may vary.](images/smtp-postal-analogy.en.svg)

With that shared picture, the conversation could move from how the service works to what to do next. That is how I use analogies: to establish a familiar starting point and then explain the technical details needed for the situation.

## Communication works in both directions

Adapting language also matters within technical teams. A junior developer and an architect may draw on different experience. Development, quality assurance and infrastructure teams also view a problem through different responsibilities.

I often act as a connection between these people. With clients, I turn needs into proposals with use cases and diagrams so decisions can be validated before development starts. Within the team, I write QA and process documentation so developers, testers and infrastructure work from the same reference. I also encourage technical professionals to explain their reasoning without relying only on their field's terminology.

These conversations keep teaching me what needs explaining and which words make it easier to understand.

For me, clarity is part of technical work. I aim to contribute to building the solution while helping the people involved understand what we are building, why it is needed and how it will be used.
