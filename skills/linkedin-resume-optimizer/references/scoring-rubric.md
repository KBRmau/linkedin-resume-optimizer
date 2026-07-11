# Rubrica de pontuação (0-100) — Antes/Depois

Pontuação objetiva, amarrada nos mesmos princípios que a skill já aplica —
não é uma nota de "vibe". Calcular **duas vezes**: uma vez para o conteúdo
original (Antes), uma vez para o conteúdo otimizado (Depois), e mostrar os
dois lado a lado com a diferença. O objetivo é gamificação real: quando a
pessoa volta com mais dados (fecha uma pendência), o score do "Depois" sobe
de verdade, porque bullet com `[FALTA DADO]` não pontua como quantificado.

Nunca inflar o score do "Depois" pra impressionar — se ainda há pendência
aberta, o score reflete isso. É isso que dá ao score seu valor: ele é uma
métrica que a pessoa pode genuinamente melhorar voltando com mais dado.

## Rubrica — LinkedIn (100 pts)

| Critério | Pontos | Como pontuar |
|---|---|---|
| Headline | 10 | Estrutura função+especialização+stack e densa em palavra-chave = 10. Estrutura parcial (só função+stack, ou frase de efeito com alguma keyword) = 5. Genérica/vazia = 0. |
| About / Resumo | 15 | Segue os 4 blocos (gancho, escala atual com número, histórico relevante, stack) = 15. Tem estrutura mas sem nenhum número real na escala atual = 8. Sem estrutura clara (parágrafo solto) = 0. |
| Top skills alinhadas ao cargo-alvo | 5 | Todas alinhadas = 5. Parcialmente = 2. Genéricas/desalinhadas = 0. |
| Bullets com dado mensurável | 25 | `25 × (nº de bullets com número/métrica real ÷ total de bullets)`. Bullet com `[FALTA DADO]` não conta como quantificado. |
| 3-5 bullets por experiência | 10 | `10 × (nº de experiências dentro do range 3-5 ÷ total de experiências)`. |
| Consistência de stack entre seções | 10 | Mesma stack-chave repetida em headline/about/skills/bullets = 10. Parcial = 5. Nenhuma repetição = 0. |
| Ausência de frases banidas | 10 | `10 − 2 × (nº de ocorrências de termos de references/banned-phrases.md)`, mínimo 0. |
| Marca pessoal (foto + banner + Featured) | 10 | `10 × (nº de itens confirmados presentes ÷ 3)`. Se não informado, tratar como 0 nesse item (não pontuar o que não foi confirmado). |
| Open to Work configurado corretamente | 5 | 5 se a pessoa está buscando vaga e o checklist foi preenchido (Recruiters only, Immediately, campos sem lacuna). 0 se não aplicável (não está buscando) ou incompleto. |

**Total: 100.**

## Rubrica — Currículo (100 pts)

| Critério | Pontos | Como pontuar |
|---|---|---|
| Título / Resumo Profissional | 15 | Título de nível correto + resumo denso com pelo menos 1 número real = 15. Estrutura ok mas sem número = 8. Sem estrutura = 0. |
| Competências alinhadas ao cargo-alvo | 5 | Mesma lógica do Top skills do LinkedIn. |
| Bullets com dado mensurável | 25 | Mesmo cálculo do LinkedIn. |
| 3-5 bullets por experiência | 10 | Mesmo cálculo do LinkedIn. |
| Consistência de stack entre seções | 10 | Mesmo cálculo do LinkedIn. |
| Ausência de frases banidas | 10 | Mesmo cálculo do LinkedIn. |
| Formatação ATS | 10 | Coluna única, cabeçalhos convencionais, ordem cronológica, dentro do limite de página = 10. Um desses violado = -3 cada, mínimo 0. |
| Portfólio (áreas criativas) ou equivalente (GitHub/projeto técnico) | 10 | Presente e linkado = 10. Mencionado mas sem link (`[FALTA DADO]`) = 0. N/A se a área realmente não usa nenhum dos dois — nesse caso redistribuir os 10 pontos proporcionalmente nos outros critérios e anotar isso no relatório. |
| Dados de contato completos | 5 | Telefone + e-mail + localização presentes = 5. Proporcional se faltar 1 = 3, 2+ faltando = 0. |

**Total: 100.**

## Como reportar

Tabela curta no `.md`, seção `## Score`:

```markdown
## Score

| | Antes | Depois |
|---|---|---|
| **Total** | XX/100 | YY/100 |
| Headline / Título | X | Y |
| About / Resumo | X | Y |
| Top skills / Competências | X | Y |
| Bullets quantificados | X | Y |
| 3-5 bullets por experiência | X | Y |
| Consistência de stack | X | Y |
| Frases banidas | X | Y |
| Marca pessoal / Portfólio | X | Y |
| Open to Work / ATS | X | Y |

Ganho: +NN pontos. Maior gargalo restante: <critério com menor pontuação no
Depois>, geralmente por pendência de dado ainda em aberto — feche essa
pendência e o score sobe de verdade.
```
