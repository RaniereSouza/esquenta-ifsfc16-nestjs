[[Esquenta #02][Live #01]](https://www.youtube.com/watch?v=74Rks96yaAY) Imersão Full Stack && Full Cycle #16:
================================================
## *Aplicação REST para gestão de Vídeos e Categorias, construída com Nest.js 10, MySQL, Prisma ORM e documentada com Swagger.*

---

## Como rodar
1. **Rode o container de MySQL** com o comando `npm run start:mysql` (após isso, os logs do container de MySQL vão ficar aparecendo)
2. **Inicie a configuração do Prisma** com o comando `npm run setup:prisma` (ele vai pedir pra responder "sim" para a instalação da ferramenta de linha de comando do Prisma)
3. **Inicie a aplicação Nest.js** com o comando `npm run start:dev` (ela vai iniciar no modo de desenvolvimento, ou seja, vai monitorar modificações nos arquivos para recompilar a aplicação)

---

## Problemas conhecidos
* **Docker daemon parou de rodar:** Vi acontecer algumas vezes durante o fechamento e reabertura do devcontainer (na opção "Close Remote Connection", por exemplo) que pode ser que no momento da reabertura do devcontainer o comando `docker` fique indisponível, porque o Docker daemon não está iniciado (isso atrapalha que o container de MySQL rode, o que é necessário para a aplicação rodar também). Ainda não sei porque isso acontece, e a única forma de resolver isso que eu descobri foi rebuildar o devcontainer.
* **URLs para o GitHub Codespaces *vs.* URLs para o VS Code local:** Algumas partes da aplicação que abririam no browser não estavam abrindo nada no GitHub Codespaces (no caso, peguei o problema ao tentar abrir o Prisma Studio). Para tudo funcionar como o esperado, tive que declarar explicitamente no `.devcontainer/devcontainer.json` quais portas eu pretendia fazer port-forwarding (atributo `"forwardPorts"`). Rodando o devcontainer localmente no VS Code, isso não tinha acontecido.
* **Permissões do Git no devcontainer:** A extensão de devcontainers do VS Code pode iniciar o devcontainer de algumas formas diferentes. duas delas são: a) Iniciar devcontainer a partir da pasta local do repositório; b) Iniciar devcontainer a partir do repositório remoto do GitHub. Na opção a), qualquer operação dentro do devcontainer que necessitasse de permissões SSH (por exemplo, `git fetch` ou `git push`) tinha sua permissão negada. Não entendi ainda como resolver esse problema específico, mas parece ter a ver com usar no repositório local a URL `origin` no modo HTTP ao invés do modo SSH (não testei essa sugestão). Para não ter esse problema localmente, usei a forma b) de gerar devcontainer (ou, caso prefira, use o GitHub Codespaces). 
