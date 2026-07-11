---
name: linkedin-resume-optimizer
description: Coleta os dados de um perfil do LinkedIn (headline, about, top skills, experiências, educação) e do currículo, e devolve uma versão otimizada para a área de atuação desejada, com foco em busca de recrutador, densidade de palavras-chave e bullets orientados a resultado. Use quando o usuário pedir para "otimizar meu linkedin", "melhorar meu currículo", "revisar meu perfil profissional" ou similar.
---

# LinkedIn & Currículo Optimizer

Skill de duas etapas: **coleta** e **otimização**. Não pule etapas — a otimização
sem os dados completos produz texto genérico. Este arquivo é a fonte da
verdade; as versões em `.claude/skills/`, `.cursor/rules/` e `.codex/prompts/`
apenas apontam para ele.

## Etapa 1 — Coleta de dados

Peça as informações **uma seção por vez**, nesta ordem, colando o texto como
aparece no LinkedIn (não peça para o usuário resumir — texto bruto é melhor).
**Faça exatamente uma pergunta por vez e espere a resposta** antes de pedir a
próxima — uma lista inteira de perguntas de uma vez tende a ser respondida
pela metade ou ignorada.

1. **Headline** (a legenda embaixo do nome).
2. **About** (o resumo/bio).
3. **Top skills** (as 3–5 destacadas no topo do perfil).
4. **Experiências** — para cada cargo: título, empresa, tipo de contrato,
   período, localização, bullets de descrição, e as skills marcadas no rodapé
   do card (ex. "Google Cloud Platform (GCP), Apache Airflow e +5 skills").
5. **Educação** — instituição, grau, curso, período, skills marcadas.
6. **Área/cargo-alvo** — para qual vaga ou área a pessoa quer que o perfil seja
   otimizado (ex. "Engenharia de Dados", "Backend Go", "Produto"). Isso muda
   quais palavras-chave e conquistas devem ganhar destaque.
7. **Idioma do perfil** — perguntar se o perfil deve ficar em português ou em
   inglês. Usar o mesmo idioma em headline, about e bullets de experiência —
   nunca misturar. Se o texto original já veio todo num idioma só, confirme
   que é para manter esse idioma em vez de assumir.
8. **(Opcional) Social Selling Index** — pedir para abrir
   `linkedin.com/sales/ssi` e colar os quatro números de "Four components of
   your score" (Establish your professional brand / Find the right people /
   Engage with insights / Build relationships). Isso não muda o texto do
   perfil, mas informa recomendações comportamentais complementares. Ver
   `references/ssi-tips.md` para a escala de pontuação e as dicas por pilar —
   não invente dica, use as listadas lá.
9. **(Opcional) Currículo em PDF/texto**, se o usuário também quiser o CV
   otimizado, não só o LinkedIn. Se pedir isso, aplicar a Etapa 2b além da
   Etapa 2 — currículo não é o mesmo formato que o perfil do LinkedIn.
10. **(Opcional, só se for otimizar currículo) Descrição da vaga-alvo**, se
   houver uma vaga específica em mente — permite casar palavras-chave do
   currículo com o ATS (Applicant Tracking System) daquela vaga. Sem isso,
   otimiza para o cargo-alvo genérico do item 6. Se houver, aplique **keyword
   injection por reformulação, nunca por invenção**: pegue o vocabulário
   exato da vaga e reescreva experiência real do usuário com esse vocabulário
   — nunca adicione uma skill que o usuário não tem só porque está na vaga.
   Ex.: vaga pede "MLOps" e o currículo já tem "observability" e "error
   handling" separados → reformular como "MLOps and observability: evals,
   error handling" (mesma experiência, vocabulário casado).

Se o usuário já mandar tudo de uma vez (comum), não precisa perguntar de novo —
só confirme se algo essencial está faltando (mais comumente: o cargo-alvo).
(A regra de "uma pergunta por vez" vale para esta coleta inicial, quando ainda
não há rascunho — na etapa final de fechar pendências sobre um rascunho quase
pronto, o formato muda para lista única; ver "Antes de gerar o arquivo".)

## Etapa 2 — Otimização

Aplique os princípios abaixo, depois entregue o resultado no formato da seção
"Formato de saída".

### Princípios (o que separa um perfil fraco de um forte)

Comparando um perfil com baixa densidade de recrutamento contra um com alta
densidade, os padrões que fazem diferença são:

- **Headline = função + especialização + stack, separados por `|` ou `·`**,
  não uma frase de efeito. Cada termo ali é uma palavra-chave pesquisável por
  recrutador (ex. `Senior Data Engineer | Cloud Data Platforms & AI Automation
  | GCP · Azure · Airflow · Spark · BigQuery · Terraform`). Evite headlines
  genéricas tipo "Passionate developer looking for opportunities".

- **Título com o nível de senioridade correto para os anos de experiência**,
  não o título literal do último cargo. Mapeamento-base: `< 2 anos` → Junior,
  `2–5 anos` → Pleno/Mid-level, `5+ anos` → Senior (ajustar para cima se a
  pessoa já teve responsabilidade de liderança técnica/arquitetura, mesmo com
  menos tempo). Esse nível deve ser o mesmo em headline, About e em **todos**
  os títulos de experiência listados (ver próximo princípio) — inconsistência
  de nível entre seções (ex. headline diz "Senior" mas os cargos antigos
  dizem "Desenvolvedor" sem nível) passa insegurança para quem lê.

- **Normalizar os títulos de todas as experiências para o mesmo nível de
  senioridade do cargo-alvo**, mesmo que o título formal no contrato/carteira
  fosse outro (ex. trocar "Desenvolvedor PHP" e "Desenvolvedor de software"
  por "Senior Backend Developer" se a pessoa hoje se posiciona como sênior).
  Isso é uma escolha de personal branding, não um fato — sempre confirme com
  o usuário antes de aplicar, porque muda o que aparece publicamente como
  cargo formal no perfil.

- **About com estrutura em 4 blocos**:
  1. Gancho: **exatamente o mesmo título usado na headline** + anos de
     experiência + área de foco, em 1 frase (ex. "Senior Backend Developer
     with 5+ years of experience...").
  2. Escala do papel atual: números concretos (pipelines, usuários, volume de
     dados, % de redução de incidentes, tamanho de time) — não só "trabalho
     com X".
  3. Histórico anterior relevante: 1 parágrafo por experiência anterior
     relevante, também com resultado mensurável, não lista de tecnologias.
  4. Linha final de "strongest areas" / stack, densa em palavras-chave, para
     casar com buscas booleanas de recrutador.

- **Top skills alinhadas ao cargo-alvo**, não às skills mais endossadas
  historicamente se elas não servem para a vaga desejada.

- **Bullets de experiência = Verbo de ação + o que foi construído/liderado +
  tecnologia + resultado quantificado**. Rejeite bullets que só descrevem
  responsabilidade sem resultado (ex. "Maintained and integrated web systems"
  vira fraco; "Reduced [processo] from 2 days to 10 minutes usando [stack]" é
  forte). Se o usuário não tem o número exato, pergunte por uma estimativa
  plausível antes de inventar — nunca invente métricas.

- **Template de bullet sênior**: `Led the [creation/migration/development] of
  [o que foi construído], [suportando/atendendo <métrica de escala>],
  [processando <métrica de volume>], [<métrica de impacto de negócio>], using
  [stack]`. Ideia: abrir com "Led" (ou outro verbo de liderança/ownership),
  encadear 2-3 cláusulas de métrica antes de citar a tecnologia — a tech vai
  no final, não no início, porque o que vende é o tamanho/impacto do que foi
  construído, não a lista de ferramentas. Ex.: `Led the creation of a payment
  system that supports 100K+ clients, processes 100K+ events/day, and
  handles $1B+ in transaction volume, using Go, Kafka, and PostgreSQL.` Cada
  métrica da cláusula precisa ser real ou uma estimativa que o usuário
  confirmou — nunca preencha com o número de exemplo genérico sem confirmar
  que reflete a realidade daquela experiência específica.

- **Consistência de stack entre headline, about, top skills e bullets** — as
  mesmas 5-8 tecnologias-chave devem aparecer repetidas nessas quatro seções.
  Motivo concreto — o "teste dos 6 segundos": um recrutador decide se
  continua lendo o perfil/currículo em ~6 segundos, olhando só o topo. Se
  cargo-alvo + stack forte + 1 resultado de produção/negócio não ficam óbvios
  nesse primeiro olhar, sem precisar garimpar bullet por bullet, o resto do
  documento pode nem ser lido — por isso a repetição do mesmo vocabulário no
  topo (headline/título + resumo) não é redundância, é o que garante que a
  informação certa apareça exatamente onde o olho passa primeiro.

- **Lista de termos banidos** — ver `references/banned-phrases.md`. Dois
  grupos: (1) clichês vazios de currículo ("leveraged", "spearheaded",
  "facilitated", "synergies", "robust", "seamless", "cutting-edge",
  "passionate about", "results-oriented", "proven track record" — e
  equivalentes em português tipo "apaixonado por", "dinâmico", "proativo"
  sem prova); (2) verbos de ownership fraco quando existe verbo mais forte
  disponível ("helped", "assisted", "responsible for", "worked on",
  "participated in" → trocar por "led", "built", "designed", "drove" sempre
  que a pessoa de fato liderou/construiu aquilo, não só participou). Revisar
  todo texto final contra essa lista antes de considerar pronto.

- **3 a 5 bullets por experiência, sempre — inclusive em cargos antigos ou
  menos alinhados ao cargo-alvo.** Não existe regra de "encurtar cargo antigo
  para 1-2 linhas": se o cargo tem conteúdo real por trás (responsabilidades,
  sistemas, decisões tomadas), vale minerar esse conteúdo e escrever 3-5
  bullets quantificados, do mesmo jeito que qualquer outra experiência — só
  reduzir abaixo de 3 se genuinamente não houver substância para sustentar
  mais bullets sem enchimento genérico. Cargo antigo pode (e deve) puxar
  menos peso relativo no conjunto do perfil por estar mais longe no tempo,
  mas isso se resolve com a ordem (mais recente primeiro) e com bullets mais
  focados no que é transferível — não com um único bullet raso. Se o cargo
  tem mais pontos do que 5, escolha os de maior peso de resultado mensurável
  e corte o resto — não empilhe responsabilidades genéricas só porque
  existiam no texto original. Menos bullets do que o necessário, ou bullets
  rasos demais, lê como júnior tentando preencher espaço tanto quanto bullets
  em excesso.

- **Sênior se mostra com número, não com adjetivo.** "Led", "senior",
  "expert" no texto não convencem sozinhos — o que convence é dado
  mensurável (throughput, latência, uptime, tamanho de time, redução de
  tempo/custo, volume de dados/usuários, % de automação). Isso vale tanto
  para o About quanto para cada bullet de experiência. Use
  `references/senior-benchmark-profile.md` como régua de calibração: é um
  perfil real de Data Engineer sênior fornecido pelo usuário como exemplo do
  nível de densidade de dado que um perfil "que já recebe atenção de
  recrutador" tem — cada bullet ali tem pelo menos um número. Ao otimizar
  qualquer outro perfil, mire nessa densidade.

### Etapa 2b — Currículo (CV), só se o usuário pedir

Currículo e LinkedIn seguem os **mesmos padrões de conteúdo** — mesma régua
de senioridade, mesmo template de bullet, mesmo range de 3-5 bullets por
experiência (sem exceção para cargo antigo), mesma exigência de dado
mensurável. Não existe versão "resumida" ou com regras próprias para o
currículo — os dois documentos usam os princípios da seção anterior como um
único padrão. A única coisa que muda entre os dois é a **estrutura de
seções**, porque um currículo não tem headline nem About no sentido do
LinkedIn:

- **Sem headline separada** — vira o título logo abaixo do nome no topo do
  documento (mesmo texto/nível de senioridade usado no LinkedIn, por
  consistência entre os dois documentos).
- **Sem "About" — vira "Professional Summary"**: 2-3 frases (não 4
  parágrafos), com o mesmo gancho (título + anos + foco) e 1-2 números de
  maior impacto. Currículo é escaneado em segundos, precisa ser mais denso e
  mais curto que o About do LinkedIn.
- **Experiência**: mesmos princípios de bullet (3-5 por cargo, quantificado,
  template Led+escala+tech), mas em formato de currículo (empresa, cargo,
  período, local, bullets) — sem o texto de abertura em prosa que o LinkedIn
  usa antes dos bullets.
- **Skills**: lista compacta, agrupada por categoria se fizer sentido
  (Linguagens / Cloud / Ferramentas), sem limite de 3-5 como no LinkedIn.
- **Regras ATS (Applicant Tracking System)** — currículo passa por parser
  automático antes de chegar a um humano:
  - Formatação simples: sem tabelas, colunas, caixas de texto, ícones ou
    gráficos — a maioria dos parsers de ATS quebra ou perde conteúdo nesses
    elementos.
  - Fonte padrão (Arial, Calibri, Times New Roman), sem cabeçalho/rodapé com
    informação crítica (alguns parsers ignoram).
  - Cabeçalhos de seção com nomes convencionais: "Experience", "Education",
    "Skills" — não usar títulos criativos que o parser não reconheça.
  - Ordem reverso-cronológica, sempre.
  - 1 página se `< 10 anos` de experiência; 2 páginas se `10+` — nunca mais
    que isso.
  - Se o usuário deu a descrição da vaga-alvo (item 10 da coleta), extrair as
    palavras-chave/skills que aparecem lá e confirmar que aparecem no
    currículo (na seção de skills e/ou em pelo menos um bullet) — isso é o
    que o ATS casa primeiro.
  - **Nunca hackear o ATS**: sem texto escondido (fonte branca, tamanho 0,
    fora da margem), sem keyword stuffing (repetir uma skill várias vezes
    sem contexto só para casar com o parser), sem listar skill/métrica que
    não está na fonte de verdade que o usuário forneceu. Isso não passa
    numa entrevista técnica depois e pode desqualificar automaticamente em
    parsers que detectam o truque.
- **Saída**: arquivo próprio, `<nome-em-kebab-case>-curriculo-otimizado.md`,
  com a mesma lógica de Manter/Trocar por seção e Pendências para dado
  faltando — não misturar no mesmo arquivo do LinkedIn, são documentos
  diferentes ainda que compartilhem conteúdo.

### Etapa 2c — PDF do currículo (opcional, só se o usuário pedir explicitamente)

Por padrão a skill entrega só `.md` — **não gerar PDF automaticamente**. Se o
usuário pedir PDF do currículo, use `pdf/`:

1. Rodar `npm install` dentro de `skills/linkedin-resume-optimizer/pdf/` na
   primeira vez (instala `puppeteer-core`; não baixa Chromium — usa o
   Chrome/Edge já instalado na máquina).
2. Preencher os placeholders `{{...}}` de `pdf/cv-template.html` com o
   conteúdo final (pós Etapa 2b) do currículo — nome, contato, resumo,
   competências, experiência, projetos, educação, certificações, skills.
   Escrever o HTML preenchido em `pdf/output/<nome>-cv.html`.
3. Detectar formato de papel pelo mercado-alvo: `letter` para EUA/Canadá,
   `a4` para o resto do mundo (perguntar se não estiver claro).
4. Rodar: `node pdf/generate-pdf.mjs pdf/output/<nome>-cv.html
   pdf/output/<nome>-cv.pdf --format=<letter|a4>`.
5. Reportar o caminho do PDF gerado. Os arquivos em `pdf/output/` contêm
   dados pessoais — nunca commitar (adicionar ao `.gitignore` se ainda não
   estiver).

O template já segue as regras ATS da Etapa 2b (coluna única, sem ícone/tabela,
fonte padrão, cabeçalhos convencionais) — não é preciso reaplicar as regras,
só preencher.

### Antes de gerar o arquivo: feche as pendências

Antes de escrever o `.md`, revise a otimização inteira em rascunho. Para
**cada bullet do About e de cada experiência**, cheque se há pelo menos um
dado mensurável (volume, %, tempo, escala, contagem). Se não tiver, isso é
uma pendência — não escreva o bullet sem número torcendo para soar sênior
mesmo assim. Liste toda métrica, dado ou confirmação que falta (ex. número de
usuários impactados, ganho de performance, stack usada num cargo pouco
descrito, cargo-alvo ambíguo). Pergunte tudo isso ao usuário **de uma vez, em
lista**, antes de gerar o arquivo — não gere o `.md` com `[FALTA DADO: ...]`
espalhado se dá para simplesmente perguntar primeiro. Só prossiga sem a
resposta se o usuário disser explicitamente para gerar mesmo assim com
placeholders.

Se o usuário não sabe e **não tem como saber** o número exato (ex. empresa
não divulga métrica, dado não foi medido), não trave em `[FALTA DADO]` — ajude
a enquadrar qualitativamente com uma comparação verificável em vez de um
número inventado. Ex.: em vez de inventar "$1M+ em receita", uma frase como
"permitiu que um time de 12 desenvolvedores lançasse features 3x mais rápido"
é aceitável se o usuário confirmar que essa comparação é real — é uma
terceira opção entre "número exato" e "placeholder vazio", não uma licença
para inventar.

### Formato de saída

O entregável é um **arquivo `.md`**, não só texto no chat. Gere (ou
sobrescreva, se já existir) um arquivo nomeado
`<nome-da-pessoa-em-kebab-case>-linkedin-otimizado.md` no diretório de
trabalho atual (ou onde o usuário pedir), com esta estrutura:

```markdown
# Perfil otimizado — <Nome>

Cargo-alvo: <cargo-alvo>

## Headline
**Manter:** <o que já funciona, 1 frase>
**Trocar:**
| Antes | Depois |
|---|---|
| <texto atual> | <texto novo> |
*Por quê:* <1-2 frases>

## About
**Manter:** <1 frase>
**Trocar:**
Antes:
> <bloco de texto atual>
Depois:
> <bloco de texto novo>
*Por quê:* <1-2 frases>

## Top skills
(mesma estrutura Manter/Trocar em tabela)

## Experiências
Uma subseção `### <Empresa / cargo>` por experiência, mais recente primeiro,
cada uma com Manter/Trocar/Antes/Depois/Por quê, sempre com 3-5 bullets
(inclusive em cargos antigos — ver princípio de bullets acima).

## Educação
Manter/Trocar, mesma estrutura. Se não há nada de texto para mudar (caso
comum), registrar isso explicitamente em vez de omitir a seção.

## Resumo
Tabela final: Seção | Manter | Trocar — uma linha por seção, visão de conjunto.

## Open to Work
Checklist preenchido com os valores recomendados para cada campo (job
titles, location types, locations, start date, employment types,
visibility) — ver Etapa 3.

## SSI
Se houver os 4 números: tabela Pilar | Score | Classificação, pilar mais
fraco em destaque, e plano de ação com as 3 dicas priorizadas (ver Etapa 3 /
`references/ssi-tips.md`). Se não houver, uma linha: "SSI não informado —
opcional, ver linkedin.com/sales/ssi."

## Pendências
Lista de qualquer dado que faltou para fechar uma seção (métrica não
informada, cargo-alvo ambíguo, etc.) — nunca invente um número ausente;
marque como `[FALTA DADO: ...]` no corpo do arquivo E liste aqui.
```

Regras do conteúdo (independente de ser chat ou arquivo):

- Não reescreva silenciosamente fatos — se faltar um número, marque
  `[FALTA DADO: ...]` no lugar exato e pergunte ao usuário, nunca suponha.
- Depois de gerar o arquivo, informe ao usuário o caminho do arquivo e um
  resumo de 1-2 frases do que mudou — não repita o conteúdo inteiro no chat.

## Etapa 3 — Depois do texto: Open to Work e SSI

O texto do perfil (Etapa 2) não é o entregável inteiro. Sempre feche com
estas duas recomendações no `.md`, em seções próprias após "Resumo":

### Open to Work

Se a pessoa está buscando vaga (pergunte se não estiver claro pelo contexto),
recomende ativar o **#OpenToWork** em "Tell us what kind of work you're open
to" (botão na foto do perfil → "Open to" → "Finding a new job"). Oriente o
preenchimento de cada campo com base no cargo-alvo já coletado:

- **Job titles** (até 5): variações do cargo-alvo, do mais específico ao mais
  amplo — ex. para "Senior Data Engineer": `Senior Data Specialist`, `Senior
  Data Engineer`, `Senior Data Architect`, `Data Architect`, `Data Engineer`.
  Mais títulos = aparece em mais buscas de recrutador.
- **Location types**: marcar todos os compatíveis com o que a pessoa aceita
  (On-site / Hybrid / Remote), não só um.
- **Locations (remote)**: se aceita remoto, listar os países/regiões-alvo
  (ex. `Canada`, `United States`, `United Kingdom`, `Netherlands`, `Latin
  America`) — cada um amplia o alcance de busca por localização.
- **Start date**: sempre recomendar **"Immediately, I am actively applying"**
  — não perguntar ao usuário nem oferecer "Flexible" como alternativa. Mais
  urgência sinalizada = mais prioridade nos resultados de busca de
  recrutador; não há motivo prático para recomendar a opção mais fraca.
- **Employment types**: marcar todos os aceitáveis (Full-time, Contract,
  etc.) — não deixar só Full-time se a pessoa toparia PJ/contrato.
- **Visibility**: sempre recomendar **"Recruiters only"** — nunca a moldura
  verde ("All LinkedIn members"). Não perguntar ao usuário nem oferecer a
  moldura verde como alternativa padrão. Só quem usa LinkedIn Recruiter vê o
  sinal; é o suficiente para aparecer em busca de recrutador sem expor a
  todas as conexões (incluindo empregador atual, colegas, clientes) que a
  pessoa está procurando vaga — isso é regra fixa da skill, não uma
  recomendação caso a caso.

Sempre recomende preencher **todos os campos até o limite permitido** (5
títulos, todas as location types e localizations aplicáveis) — campo vazio é
alcance de busca perdido.

### SSI

Se o usuário forneceu os 4 números do SSI, aplique a lógica de
`references/ssi-tips.md`: classifique cada pilar (fraco/ok/forte), pegue os 2
pilares mais fracos, e liste as 3 primeiras dicas de cada um que estiver
fraco como plano de ação priorizado. Se não forneceu, não pergunte de novo
insistentemente — mencione que é opcional e pule a seção (ou deixe como
pendência leve, sem bloquear a geração do arquivo).
