## Faster systems, the same reliable results

A slow screen does not always mean a slow interface. The delay may come from an API, application logic, a database query or an external service. My first step is to identify where the time is being spent before deciding what to change.

Working across the interface, backend and database helps me follow the whole request. My experience in QA also shapes the work: improving speed matters, but so does checking that users still receive the right information.

## A practical example: doing less work on millions of records

A searchable list used a table containing millions of records. To display each result, its query combined information from related tables and calculated additional fields, such as totals and statuses.

The expensive part was the amount of data involved. The original approach enriched a large set of records before narrowing it down to the results the user needed. Much of that processing was discarded because the screen displayed only one page.

I changed the approach so that the expensive work happened on a smaller set:

1. **Find the matching records.** Apply the search criteria before loading details that are not needed to identify the results.
2. **Select the page.** Keep the identifiers of the records to display, using the required sort order.
3. **Add the details.** Retrieve related information and calculate the remaining fields for those records.

Think of preparing a report from a large archive: first find the files you need, then assemble their details, rather than preparing a full report for every file in the archive.

![Comparison of a query that enriches a large result set before filtering and a query that filters and selects one page before adding its details.](images/filter-first.en.svg)

For this case, execution time fell by approximately **99%, while returning the same data**. This is a result from that particular query, not a promise for every system.

The change also reduced the query's dependence on indexes to remain usable. An index helps locate records, much like the index of a book, but it also has storage and update costs. The lesson was to remove unnecessary work first and evaluate indexes against the actual workload—not to stop using them.

This approach needs care: if a related value determines whether a record matches, or where it belongs in the sort order, it must be considered before selecting the page. Otherwise, a faster query could return the wrong results.

## How I reduce unnecessary work

I apply the same reasoning to APIs, screens and background processes. The aim is to avoid repeated work and move only the data needed for the task.

| Decision | What it changes |
| --- | --- |
| Validate input early | Reject invalid requests before starting expensive processing; keep authoritative validation on the server. |
| Prepare the request | Normalize inputs and collect the context the process needs, avoiding repeated lookups. |
| Check permissions at the right level | Reuse shared checks where appropriate while preserving any rules specific to each record. |
| Batch independent work | Process groups of records and use controlled parallelism when dependencies and capacity allow it. |
| Filter close to the source | Avoid loading a full dataset when the caller needs only a few rows or fields. |
| Shape the response deliberately | Decide where calculations belong based on their purpose, data volume and measured cost. |

I also look for reusable requests that can serve more than one screen through clear parameters. Reuse should simplify a feature, not produce an endpoint that loads everything for everyone. The same applies to code: I separate data access, business rules and presentation without fragmenting a straightforward operation unnecessarily.

## What this looks like across the system

### Database: reduce repeated calculations

I have replaced calculations performed separately for each row with operations over a group of rows. I also review subqueries that depend on each result row, comparing them with joins or grouped totals where those alternatives reduce work.

For complex stored procedures—programs saved in the database—I look for accumulated conditions that make execution harder to optimize. More focused queries can make the work easier to understand and tune.

Temporary tables are another option when the database needs better information about intermediate results. SQL Server's statistics help it estimate data volumes and choose an execution plan. Table variables do not have column distribution statistics, although newer features improve their row-count estimates. I assess the plan and workload rather than assuming one structure is always better.

### Backend: make data access intentional

With tools such as Entity Framework, code can hide when a database query runs or how much data it loads. I make that boundary explicit: filter in the database where appropriate, retrieve only useful fields and keep data-access code separate from business rules.

Presentation-oriented values, such as formatted labels, can often be prepared in the API. Calculations needed for filtering, sorting or aggregation may belong in the database. The choice follows the operation, not a blanket rule about which layer is faster.

### Interface: load what the user needs

A screen does not need to fetch everything at startup. I defer data used by occasional actions and limit requests to the visible scope—for example, the dates currently shown in a calendar.

Shared input components catch formatting problems early, and stable reference text can be generated ahead of time when it does not require a runtime lookup. These choices reduce unnecessary requests and keep the first interaction lighter.

## Readable code makes expensive work easier to see

Studying DDD, SOLID and Object Calisthenics, alongside techniques such as object literals and closures, has shaped how I organize code. One lesson I draw from that learning is that understanding a function means understanding both its purpose and how its work grows as it receives more data. These approaches help me reason about design; they do not automatically make code faster.

Algorithmic complexity, often written as **Big O**, describes that growth rather than an exact execution time. With **O(n)** work, doubling the number of items roughly doubles the work. With **O(n²)** work, it can roughly quadruple it. For example, checking every item against every other item can become expensive as a list grows, even if it feels instant with a small sample.

That is why I look for repeated searches, loops inside loops and database calls hidden inside per-item processing. I also avoid unnecessary nesting so the execution path stays easy to follow. Indentation itself does not determine complexity: a short expression can hide expensive work, while nested conditions can be inexpensive.

I do not apply these ideas rigidly. A simple quadratic solution may be reasonable for a small, bounded input. The decision depends on expected volume, actual measurements and the cost of a more complicated alternative.

Readability remains essential in either case. Clear names, explicit responsibilities and a visible execution path help the next developer understand the intention before changing the code. When a performance trade-off is necessary, I want it explained—not hidden in an implementation that is difficult to follow.

## Confirming that the improvement is safe

Before changing a process, I establish its current performance and expected results. Afterward, I compare both: the time required and the information returned under comparable conditions.

Regression checks, clear acceptance criteria and documented evidence connect performance work with QA. The goal is a system that responds sooner, preserves its business rules and remains understandable to the next person maintaining it.

### Technical references

- [Microsoft: efficient querying with Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying)
- [Microsoft: table variable deferred compilation](https://learn.microsoft.com/en-us/sql/relational-databases/performance/intelligent-query-processing-details#table-variable-deferred-compilation)
