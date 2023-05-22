const socket = io();
let user;
const inputMsj = document.getElementById("msj");


console.log("HOLAAAA");
Swal.fire({
    title:"Bienvenido",
    input: "text",
    text: "Identificate para participar del chat",
    icon: "success",
    inputValidator: (value)=>{
        return !value && 'Tenes que identificarte';
    },
    allowOutsideClick: false,
}).then((result)=>{
    user = result.value;
    socket.emit('sayhello',user);
});


socket.on('conectado',(data)=>{
    console.log("estoy aqui");
    Swal.fire({
        text:`Se conecto ${data}`,
        toast: true,
        position: 'top-right'
    });
});

function render(data) {
	// Genero el html
	const html = data
		.map((elem, index) => {
			// Recorro el array de mensajes y genero el html
			return `<div>
                <strong>${elem.user}</strong>:${elem.msj}
            </div>`;
		})
		.join(' '); // Convierto el array de strings en un string

	// Inserto el html en el elemento con id messages
	document.getElementById('messages').innerHTML = html;
}


inputMsj.addEventListener('keyup', event => {
    if (event.key === "Enter"){
        let msj = inputMsj.value;
        if (msj.trim().length > 0) {
            socket.emit("message", {user, msj});
            inputMsj.value='';
        }
    }
});

socket.on('messages', data=>{
    render(data);
});
