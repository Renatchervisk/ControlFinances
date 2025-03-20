let contas = [];

function adicionarConta() {
    let empresa = document.getElementById("empresa").value;
    let cnpj = document.getElementById("cnpj").value;
    let produto = document.getElementById("produto").value;
    let tipo = document.getElementById("tipo").value;
    let valor = parseFloat(document.getElementById("valor").value);
    let dataEntrada = document.getElementById("dataEntrada").value;
    let dataVencimento = document.getElementById("dataVencimento").value;

    if (!empresa || !cnpj || !produto || !valor || !dataEntrada || !dataVencimento) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    let status = "Pendente";
    let classeStatus = "status-pendente";

    let novaConta = { empresa, cnpj, produto, tipo, valor, dataEntrada, dataVencimento, dataPagamento: "", status, classeStatus };
    contas.push(novaConta);

    atualizarTabela();
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaContas");
    tabela.innerHTML = "";

    let totalPagar = 0, totalReceber = 0, totalVencidas = 0;

    contas.forEach((conta, index) => {
        let hoje = new Date();
        let vencimento = new Date(conta.dataVencimento);

        if (!conta.dataPagamento && vencimento < hoje) {
            conta.status = "Vencido";
            conta.classeStatus = "status-vencido";
        }

        let row = tabela.insertRow();
        row.insertCell(0).textContent = conta.empresa;
        row.insertCell(1).textContent = conta.cnpj;
        row.insertCell(2).textContent = conta.produto;
        row.insertCell(3).textContent = conta.tipo;
        row.insertCell(4).textContent = `R$ ${conta.valor.toFixed(2)}`;
        row.insertCell(5).textContent = conta.dataEntrada;
        row.insertCell(6).textContent = conta.dataVencimento;

        let dataPagamentoCell = row.insertCell(7);
        let inputDataPagamento = document.createElement("input");
        inputDataPagamento.type = "date";
        inputDataPagamento.onchange = function () {
            conta.dataPagamento = inputDataPagamento.value;
            conta.status = conta.tipo === "pagar" ? "Pago" : "Recebido";
            conta.classeStatus = conta.tipo === "pagar" ? "status-pago" : "status-recebido";
            atualizarTabela();
        };
        dataPagamentoCell.appendChild(inputDataPagamento);

        let statusCell = row.insertCell(8);
        statusCell.textContent = conta.status;
        statusCell.classList.add(conta.classeStatus);

        if (conta.tipo === "pagar") totalPagar += conta.valor;
        if (conta.tipo === "receber") totalReceber += conta.valor;
        if (conta.status === "Vencido") totalVencidas += conta.valor;
    });

    document.getElementById("totalPagar").textContent = `R$ ${totalPagar.toFixed(2)}`;
    document.getElementById("totalReceber").textContent = `R$ ${totalReceber.toFixed(2)}`;
    document.getElementById("totalVencidas").textContent = `R$ ${totalVencidas.toFixed(2)}`;
}
