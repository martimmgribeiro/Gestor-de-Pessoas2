let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

mostrar();

function guardarPessoa(){

    let nome=document.getElementById("nome").value;

    let telefone=document.getElementById("telefone").value;

    let morada=document.getElementById("morada").value;

    let obs=document.getElementById("obs").value;

    let foto=document.getElementById("foto").files[0];

    if(nome==""){

        alert("Introduz um nome");

        return;

    }

    if(foto){

        let reader=new FileReader();

        reader.onload=function(e){

            pessoas.push({

                nome:nome,

                telefone:telefone,

                morada:morada,

                obs:obs,

                foto:e.target.result

            });

            guardar();

        }

        reader.readAsDataURL(foto);

    }

    else{

        pessoas.push({

            nome:nome,

            telefone:telefone,

            morada:morada,

            obs:obs,

            foto:""

        });

        guardar();

    }

}

function guardar(){

    localStorage.setItem("pessoas",JSON.stringify(pessoas));

    limpar();

    mostrar();

}

function limpar(){

    document.getElementById("nome").value="";

    document.getElementById("telefone").value="";

    document.getElementById("morada").value="";

    document.getElementById("obs").value="";

    document.getElementById("foto").value="";

}

function mostrar(){

    let lista=document.getElementById("lista");

    lista.innerHTML="";

    let pesquisa=document.getElementById("pesquisa").value.toLowerCase();

    pessoas.forEach((p,index)=>{

        let texto=(p.nome+p.telefone+p.morada+p.obs).toLowerCase();

        if(texto.includes(pesquisa)){

            lista.innerHTML+=`

            <div class="card">

                <img src="${p.foto || 'https://via.placeholder.com/120'}">

                <div class="info">

                    <h2>${p.nome}</h2>

                    <p><b>Telemóvel:</b> ${p.telefone}</p>

                    <p><b>Morada:</b> ${p.morada}</p>

                    <p><b>Observações:</b> ${p.obs}</p>

                    <button class="apagar" onclick="apagar(${index})">Eliminar</button>

                </div>

            </div>

            `;

        }

    });

}

function apagar(index){

    if(confirm("Eliminar esta pessoa?")){

        pessoas.splice(index,1);

        localStorage.setItem("pessoas",JSON.stringify(pessoas));

        mostrar();

    }

}

document.getElementById("pesquisa").addEventListener("input",mostrar);