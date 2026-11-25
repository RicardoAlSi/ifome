export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold tracking-tight text-ifma-verde">IFome</h1>
        <p className="font-mono text-sm text-zinc-500">Pediu, pegou, comeu.</p>
      </header>

      <section className="flex flex-col gap-4 text-lg leading-relaxed text-zinc-700">
        <p>
          No intervalo, todo mundo chega à cantina do IFMA Campus Grajaú ao mesmo tempo: os pedidos
          se acumulam, a fila cresce e o aluno perde parte do intervalo esperando. A cantina também
          tem dificuldade para acompanhar o estoque e saber quais são os horários de maior venda.
        </p>
        <p>
          O <strong className="text-ifma-verde-escuro">IFome</strong> organiza esse atendimento. O
          aluno consulta o cardápio pelo celular, faz o pedido com antecedência e escolhe uma janela
          de retirada de 15 minutos. Ao confirmar, recebe um código para acompanhar o preparo e
          retirar no balcão. A cantina recebe os pedidos agrupados por horário, controla o estoque,
          e a gestão consulta o histórico de vendas.
        </p>
      </section>
    </main>
  );
}
