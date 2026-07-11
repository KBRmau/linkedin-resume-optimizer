# linkedin-skill

Skill portátil para otimizar perfis de LinkedIn e currículos, utilizável em
Claude Code, Cursor e Codex.

## Como usar (explicado bem simples)

Imagina que você tem um amigo muito esperto que sabe exatamente o que
recrutadores gostam de ler. Você só precisa mostrar suas coisas pra ele, uma
de cada vez, e ele te devolve tudo arrumadinho.

**Passo 1 — Peça pra começar.**
Abra o Claude Code (ou Cursor, ou Codex) dentro desta pasta e diga algo como
"quero otimizar meu LinkedIn". A skill acorda sozinha.

**Passo 2 — Responda uma pergunta de cada vez.**
Ele vai pedir, uma coisa por vez (sem te afogar com uma lista gigante):
1. O texto debaixo do seu nome no LinkedIn (headline).
2. O texto "Sobre" (About).
3. Suas 3 principais skills.
4. Cada emprego que você já teve.
5. Sua educação.
6. Pra qual vaga/área você quer melhorar o perfil.
7. Se seu perfil tá em português ou inglês.

Dica: pode colar tudo de uma vez também, se for mais fácil — ele entende.

**Passo 3 — Ele te faz perguntas de "detetive".**
Se algum bullet ficar sem número (tipo "ajudei muito" sem dizer quanto), ele
vai perguntar antes de escrever qualquer coisa — porque "ajudei muito" não
convence ninguém, mas "atendi 100 clientes" sim. Se você não sabe o número
exato, tudo bem, ele te ajuda a estimar.

**Passo 4 — Ele entrega um arquivo `.md`.**
Um arquivo de texto mostrando **o que tinha antes** e **como fica melhor**,
seção por seção, com o motivo de cada troca. Você lê, decide o que aceita.

**Passo 5 — Se quiser, ele também arruma seu currículo.**
É só pedir. Ele usa as mesmas regras do LinkedIn, só muda o formato (porque
currículo não tem "headline" nem "About" do jeito que o LinkedIn tem).

**Passo 6 — Se quiser, ele transforma o currículo em PDF de verdade.**
Só acontece se você pedir — por padrão ele só entrega o texto. Se pedir PDF,
ele monta um arquivo bonito e pronto pra passar pelos robôs que as empresas
usam pra ler currículo (isso se chama ATS).

**Passo 7 — Dicas de "Aberto a trabalho" e SSI.**
No final, ele te dá um checklist de como configurar o botão verde
"#OpenToWork" do LinkedIn, e — se você colar os números do SSI (uma nota que
o próprio LinkedIn te dá) — ele te fala exatamente o que fazer pra melhorar
essa nota.

**Importante:** os arquivos que ele gera (o `.md` do seu perfil, o `.md` do
seu currículo, o PDF) **nunca vão pro GitHub sozinhos** — eles ficam só no
seu computador, porque têm seus dados pessoais. Isso já vem configurado.

## Onde está o conteúdo (pra quem for mexer na skill)

O arquivo canônico é [`skills/linkedin-resume-optimizer/SKILL.md`](skills/linkedin-resume-optimizer/SKILL.md).
Todo o comportamento da skill (o que perguntar, como avaliar, formato de
saída) vive lá. Os outros arquivos são só "ganchos" de descoberta para cada
ferramenta apontarem para o mesmo conteúdo, sem duplicar a lógica:

- `.claude/skills/linkedin-resume-optimizer/SKILL.md` — descoberta automática
  pelo Claude Code.
- `.cursor/rules/linkedin-resume-optimizer.mdc` — regra do Cursor.
- `.codex/prompts/linkedin-resume-optimizer.md` — prompt customizado do Codex
  CLI (`/linkedin-resume-optimizer`).

Arquivos de apoio dentro de `skills/linkedin-resume-optimizer/`:

- `references/senior-benchmark-profile.md` — perfil real usado como régua de
  densidade de dado sênior (cada bullet tem pelo menos um número).
- `references/ssi-tips.md` — escala e dicas por pilar do Social Selling Index.
- `references/banned-phrases.md` — clichês e verbos fracos a evitar.
- `pdf/` — gerador de PDF opcional (template HTML + script Node com
  `puppeteer-core`, usa o Chrome/Edge já instalado, não baixa nada extra).
  Só roda se o usuário pedir PDF explicitamente.

## Como clonar e abrir em cada editor

Primeiro, em qualquer sistema, baixe o repositório uma vez:

```bash
git clone https://github.com/KBRmau/linkedin-resume-optimizer.git
cd linkedin-resume-optimizer
```

Depois, siga o passo do seu editor:

### Claude Code

1. Se ainda não tem o Claude Code instalado, veja em
   [claude.com/claude-code](https://claude.com/claude-code).
2. Abra o terminal, entre na pasta clonada (`cd linkedin-resume-optimizer`) e
   rode `claude`.
3. Pronto — a pasta `.claude/skills/linkedin-resume-optimizer/` já é
   descoberta automaticamente. Basta pedir "otimize meu linkedin".

### Cursor

1. Abra o Cursor.
2. `File → Open Folder...` e selecione a pasta `linkedin-resume-optimizer`
   que você acabou de clonar (ou `git clone` direto pelo Cursor: `Ctrl+Shift+P`
   → "Git: Clone" → cole a URL do repositório).
3. A regra em `.cursor/rules/linkedin-resume-optimizer.mdc` é carregada
   sozinha quando o pedido combina com a descrição dela — não precisa
   configurar nada.

### Codex CLI

1. Instale o Codex CLI se ainda não tiver ([documentação oficial da
   OpenAI](https://developers.openai.com/codex/cli)).
2. No terminal, entre na pasta clonada (`cd linkedin-resume-optimizer`) e
   rode `codex`.
3. Digite `/linkedin-resume-optimizer` para chamar a skill — o prompt em
   `.codex/prompts/linkedin-resume-optimizer.md` já está pronto.

> Nota: a skill só funciona de dentro da pasta clonada, porque ela lê os
> arquivos de referência (`skills/linkedin-resume-optimizer/references/` e
> `pdf/`) usando caminho relativo ao repositório.

## Como usar por ferramenta (versão técnica)

- **Claude Code**: abra este repositório, peça "otimize meu linkedin" — a
  skill é carregada automaticamente pela descrição.
- **Cursor**: abra este repositório, a regra é sugerida quando o pedido casa
  com a descrição.
- **Codex CLI**: rode `codex` dentro deste repositório e use
  `/linkedin-resume-optimizer`.

Para gerar PDF do currículo (opcional):

```bash
cd skills/linkedin-resume-optimizer/pdf
npm install   # só na primeira vez
node generate-pdf.mjs output/seu-cv.html output/seu-cv.pdf --format=a4
```

Para atualizar o comportamento da skill, edite só o arquivo canônico em
`skills/linkedin-resume-optimizer/SKILL.md`.

## Privacidade

Os arquivos gerados (`*-linkedin-otimizado.md`, `*-curriculo-otimizado.md`,
`*-curriculo-otimizado.pdf`) contêm dados pessoais reais de quem usar a
skill e estão no `.gitignore` por padrão — não vão pro repositório sozinhos.
