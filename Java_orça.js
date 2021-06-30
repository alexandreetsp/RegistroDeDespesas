class Despesa {

	constructor(Ano, mes, dia, tipo, descricao,valor){
		this.Ano = Ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	Validardados() {

		for (let i in this) {

			if (this[i] == undefined || this[i] == '' || this[i] == null){

				return false


			} 
				return true

		}
	}
}


class Bd {

	constructor(){

		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId(){

		let ProximoId = localStorage.getItem('id')


		return parseInt(ProximoId) + 1
	}

	gravar(d){

	let id = this.getProximoId()

	localStorage.setItem(id, JSON.stringify(d))

	localStorage.setItem('id', id)
}

Pegar(){

	let despesas = Array()

	let id = localStorage.getItem('id')



	for (let i = 1 ; i <= id ; i++) {		

		let despesa = JSON.parse(localStorage.getItem(i))
        if (despesa == null){
       	continue}

       	despesa.id = i

        despesas.push(despesa)   

  }


 return despesas

}

Pesquisar(despesa){

	let filtrado = Array()

	filtrado = this.Pegar()

	console.log(filtrado)
	console.log(despesa)

	if (despesa.Ano != '') {

	filtrado = filtrado.filter( d => d.Ano == despesa.Ano)

}
if (despesa.mes != '') {

	filtrado = filtrado.filter( d => d.mes == despesa.mes)

}

if (despesa.dia != '') {

	filtrado = filtrado.filter( d => d.dia == despesa.dia)

}	

if (despesa.tipo != '') {

	filtrado = filtrado.filter( d => d.tipo == despesa.tipo)

}	
if (despesa.descricao != '') {

	filtrado = filtrado.filter( d => d.descricao == despesa.descricao)

}

if (despesa.valor != '') {

	filtrado = filtrado.filter( d => d.valor == despesa.valor)

}

return filtrado	
}

remove(id){
 localStorage.removeItem(id)
}
}

let bd = new Bd



function CadastarDespesas (){

	let Ano = document.getElementById('Ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(Ano.value, mes.value, dia.value, tipo.value, descricao.value,valor.value)

	if (despesa.Validardados() == true){

	 bd.gravar(despesa)


	$('#Modalid').modal('show')



	
	let tru = document.getElementById('exampleModalLabel')
	tru.innerText = 'Registro Realizado com sucesso'
	tru.className = 'text-success'

	let text = document.getElementById('text1')
	text.innerText = 'Registro Realizado com sucesso'
	text.className = 'modal-body text-success'


	let but = document.getElementById('But')
	but.className = ' btn btn-success'
	but.innerText= 'Concluir'



	Ano.value = ''
    mes.value = ''
    dia.value = ''
	tipo.value = ''
	descricao.value = ''
	valor.value = ''

	



} else {

	$('#Modalid').modal('show')

	let tru = document.getElementById('exampleModalLabel')
	tru.innerText = 'Erro no registro'
	tru.className = 'text-danger'

	let text = document.getElementById('text1')
	text.innerText = 'Algo deu errado tente ver se todos os campos foram preenchidos corretamente'
	text.className = 'modal-body text-danger'


	let but = document.getElementById('But')
	but.className = ' btn btn-danger'
	but.innerText= ' Voltar e Corrigir'
}
}

function PegarRegistro() {

	let despesas = Array()

	despesas = bd.Pegar()

	let lista = document.getElementById('ListaR')


	despesas.forEach(function(d){

		

		let linha = lista.insertRow()


		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.Ano}`

		switch(d.tipo){

			case '1':
			d.tipo = 'Alimentação'
			break
			case '2':
			d.tipo = 'Educação'
			break
			case '3':
			d.tipo = 'Lazer'
			break
			case '4':
			d.tipo = 'Saúde'
			break
			case '5':
			d.tipo = 'Transporte'
			break
		}
		linha.insertCell(1).innerHTML = `${d.tipo}`
		linha.insertCell(2).innerHTML = `${d.descricao}`
		linha.insertCell(3).innerHTML = `${d.valor}`

		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class = "fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function () {
			let id = this.id.replace('id_despesa_', '')

			bd.remove(id)

			window.location.reload()
		}
		linha.insertCell(4).append(btn)
	})
}

function Pesquisar(){

	let Ano = document.getElementById('Ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(Ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value)

	let despesas = bd.Pesquisar(despesa)


	let lista = document.getElementById('ListaR')
	lista.innerHTML = ''


	despesas.forEach(function(d){

		

		let linha = lista.insertRow()


		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.Ano}`

		switch(d.tipo){

			case '1':
			d.tipo = 'Alimentação'
			break
			case '2':
			d.tipo = 'Educação'
			break
			case '3':
			d.tipo = 'Lazer'
			break
			case '4':
			d.tipo = 'Saúde'
			break
			case '5':
			d.tipo = 'Transporte'
			break
		}
		linha.insertCell(1).innerHTML = `${d.tipo}`
		linha.insertCell(2).innerHTML = `${d.descricao}`
		linha.insertCell(3).innerHTML = `${d.valor}`
	})


}


