# linkedin-skill

Skill portátil para otimizar perfis de LinkedIn e currículos, utilizável em
Claude Code, Cursor e Codex.

## Onde está o conteúdo

O arquivo canônico é [`skills/linkedin-resume-optimizer/SKILL.md`](skills/linkedin-resume-optimizer/SKILL.md).
Todo o comportamento da skill (o que perguntar, como avaliar, formato de
saída) vive lá. Os outros arquivos são só "ganchos" de descoberta para cada
ferramenta apontarem para o mesmo conteúdo, sem duplicar a lógica:

- `.claude/skills/linkedin-resume-optimizer/SKILL.md` — descoberta automática
  pelo Claude Code.
- `.cursor/rules/linkedin-resume-optimizer.mdc` — regra do Cursor.
- `.codex/prompts/linkedin-resume-optimizer.md` — prompt customizado do Codex
  CLI (`/linkedin-resume-optimizer`).

## Como usar

- **Claude Code**: abra este repositório, peça "otimize meu linkedin" — a
  skill é carregada automaticamente pela descrição.
- **Cursor**: abra este repositório, a regra é sugerida quando o pedido casa
  com a descrição.
- **Codex CLI**: rode `codex` dentro deste repositório e use
  `/linkedin-resume-optimizer`.

Para atualizar o comportamento da skill, edite só o arquivo canônico em
`skills/linkedin-resume-optimizer/SKILL.md`.
