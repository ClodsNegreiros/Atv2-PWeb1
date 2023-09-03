class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoDataAniversario = document.querySelector('#dataAniversario');
        const elementoSelectContas = document.querySelector('#contaSelect');

        if (elementoSelectContas.value == 'conta') {
            this.conta = new Conta(
                elementoNumero.value,
                Number(elementoSaldo.value)
            );
        } else if (elementoSelectContas.value == 'contaBonificada') {
            this.conta = new ContaBonificada(
                elementoNumero.value,
                Number(elementoSaldo.value)
            );
        } else if (elementoSelectContas.value == 'poupanca') {
            this.conta = new Poupanca(
                elementoNumero.value,
                Number(elementoSaldo.value),
                elementoDataAniversario.value
            );
        }

        this.repositorioContas.adicionar(this.conta);
        this.inserirContaNoHTML(this.conta);
    }

    inserirContaNoHTML(conta) {
        const elementoSelectContas = document.querySelector('#contaSelect');        
        const elementoP = document.createElement('p');
        
        if (elementoSelectContas.value == 'contaBonificada') {
            this.tipoConta = ' Bonificada ';
        } else if (elementoSelectContas.value == 'poupanca') {
            this.tipoConta = ' Poupança ';
        } else {
            this.tipoConta = '';
        }

        elementoP.textContent = `Conta ${this.tipoConta}` + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
