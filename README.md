# IFome — Sistema de Gestão de Cantina

Aplicativo web para organizar o atendimento e a gestão da cantina do IFMA Campus Grajaú: o aluno consulta o cardápio, faz o pedido online e retira no horário escolhido; a cantina acompanha pedidos e estoque; a gestão consulta o histórico de vendas.

> Pediu, pegou, comeu.

**Professor:** Sigfran
**Equipe:** Carlos Eduardo, João Gabriel, Kauã, Nícolas, Paulo Neto e Ricardo

> Este projeto é uma proposta construída a partir das necessidades relatadas pela cantina. As funcionalidades ainda serão validadas com o campus.

## Problemas levantados

No levantamento inicial com a cantina, apareceram dois grupos de problemas:

- **Atendimento:** pedidos desorganizados e dificuldade para controlar a fila nos horários de maior movimento. No intervalo, todo mundo chega à cantina ao mesmo tempo e o aluno perde parte do intervalo esperando.
- **Gestão e informação:** dificuldade para acompanhar o estoque, identificar os períodos de maior venda e consultar o cardápio online.

Ainda não há dados medidos de tempo de espera, vendas ou perdas. Eles serão coletados no piloto (ver "Resultados esperados").

## Proposta do sistema

Pedidos e gestão no mesmo ambiente. O IFome organiza o atendimento assim:

- o aluno vê o cardápio com preço, horário de venda e disponibilidade em tempo real;
- monta o pedido pelo celular e escolhe uma **janela de retirada** de 15 minutos;
- cada janela aceita no máximo 30 pedidos, e o pedido precisa ser feito com pelo menos 30 minutos de antecedência;
- ao confirmar, o pedido recebe um **código** (ex.: `A-042`), que o aluno usa para acompanhar o preparo e retirar no balcão;
- o pagamento continua no balcão, na retirada.

Do lado da cantina, a equipe recebe os pedidos agrupados por janela, sabe quanto preparar e confirma a entrega pelo código. O atendimento presencial continua existindo e usa o mesmo sistema, com o mesmo formato de código.

### Objetivos

1. Organizar o atendimento e diminuir a fila nos horários de pico.
2. Distribuir os pedidos ao longo do intervalo, respeitando a capacidade real de preparo e entrega da cantina.
3. Mostrar a disponibilidade atualizada dos produtos ("Últimas 4", "Esgotado").
4. Registrar entradas, saídas e perdas de estoque e avisar quando o estoque estiver baixo.
5. Dar à gestão vendas por produto, dia e horário, para identificar picos e orientar compras e preparo.

### SUAP e almoço gratuito

A proposta prevê:

- **login com a conta institucional (SUAP)**, para que só a comunidade do campus faça pedidos;
- **consulta à informação oficial sobre o direito ao almoço gratuito**, feita apenas pelos responsáveis pelo benefício.

São duas verificações diferentes, e nenhuma das duas integrações existe ainda. Elas dependem de viabilidade técnica, de autorização do IFMA e das regras do benefício definidas pelo campus. Enquanto isso não for validado, o sistema usa login com matrícula e senha e dados de exemplo.

## Perfis de usuário

| Perfil | O que faz |
|---|---|
| Aluno | Vê o cardápio, faz pedidos, escolhe a janela de retirada e acompanha o status pelo código |
| Equipe da cantina | Vê a fila de pedidos, muda o status, confirma a entrega pelo código e registra pedidos presenciais e o estoque |
| Gestão | Consulta relatórios de vendas e perdas e configura as regras (janelas, limites, estoque mínimo) |
| Responsável pelo benefício | Consulta se um aluno tem direito ao almoço gratuito (informação visível só para esse perfil) |
| Painel de chamada (TV) | Tela pública, sem login, que mostra os códigos "Em preparo" e "Pronto — retire" |

## Funcionalidades

**Aluno**
- Entrar com matrícula e senha
- Ver o cardápio por categoria, com busca, preço, horário de venda e disponibilidade
- Adicionar e remover itens do carrinho e alterar quantidades
- Escolher uma janela de retirada entre as que ainda têm vagas
- Revisar e confirmar o pedido, que gera o código
- Acompanhar o status (Recebido → Em preparo → Pronto para retirada → Entregue)
- Cancelar o pedido enquanto ele estiver como Recebido
- Ver o histórico dos próprios pedidos

**Cantina**
- Ver a fila de pedidos por status e por janela
- Avançar o status do pedido
- Confirmar a entrega digitando o código
- Registrar pedido presencial no balcão
- Registrar entradas, saídas e perdas de estoque; receber aviso de estoque baixo

**Gestão**
- Relatórios de vendas por produto, dia e horário, com os picos de demanda
- Configuração das janelas, do limite de pedidos por janela e do estoque mínimo


## Regras de negócio

| Regra | Descrição |
|---|---|
| Janela de retirada | Cada janela tem 15 minutos e um limite de pedidos (padrão: 30). Ao atingir o limite, aparece como Lotada e não pode ser escolhida. |
| Antecedência | Pedidos online são aceitos até 30 minutos antes do início da janela. |
| Código do pedido | Letra + hífen + 3 dígitos (`A-042`). A letra indica o turno ou o balcão, e a numeração reinicia todo dia. Pedidos presenciais usam o mesmo formato. |
| Status | Recebido → Em preparo → Pronto para retirada → Entregue. O aluno só cancela enquanto o pedido está como Recebido; a cantina pode cancelar antes da entrega, informando o motivo. |
| Não retirado | Pedido pronto e não retirado até 30 minutos após o fim da janela passa a Não retirado. |
| Estoque | Itens de um pedido confirmado ficam reservados, são baixados na entrega e voltam ao estoque se o pedido for cancelado. Com estoque zerado, o produto vira Esgotado; com estoque igual ou abaixo do mínimo, mostra "Últimas N". |
| Horário de venda | Um item só aparece no cardápio dentro do seu horário de venda (ex.: café da manhã até 9h30). |
| Pedidos ativos | Cada aluno pode ter no máximo 2 pedidos ativos ao mesmo tempo. |
| Privacidade | O painel da TV mostra apenas códigos, nunca nomes. A informação sobre o almoço gratuito só aparece para o responsável pelo benefício. |

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Linguagem | **TypeScript** (backend e frontend) |
| Banco de dados | **MySQL 8**, com as tabelas e as consultas escritas **em SQL, à mão** |
| Backend | **Node.js 20** com **Express 4** |
| Acesso ao banco | **mysql2** (driver oficial com suporte a Promises e consultas parametrizadas) |
| Validação | zod |
| Autenticação | JWT (jsonwebtoken) e senhas com hash (bcrypt) |
| Frontend | **Next.js 15** (React 19) com **TailwindCSS 4** |
| Leituras no frontend | SWR |
| Ícones | Lucide React |
| Testes | Vitest (regras de janela e de status) |

### Por que sem ORM

O projeto não usa ORM (Prisma, Sequelize etc.). Todo o banco é feito com comandos SQL escritos pela equipe:

- as tabelas são criadas pelo script `database/schema.sql`, rodado à mão no MySQL;
- os dados de exemplo são inseridos pelo script `database/seed.sql`;
- cada Model do backend contém as próprias consultas (`SELECT`, `INSERT`, `UPDATE`) e as executa pelo `mysql2`.

Todas as consultas usam parâmetros (`?`) em vez de concatenar texto, o que evita SQL injection. As operações que mexem em vagas e estoque rodam dentro de uma transação (`BEGIN` / `COMMIT`), para que dois alunos não peguem a última vaga ao mesmo tempo.
