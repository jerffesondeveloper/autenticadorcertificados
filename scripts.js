document.getElementById("btn-validar").onclick = async () => {
    const codigo = document.getElementById("codigo").value.trim();
    const resBox = document.getElementById("resultado");
    const resContent = document.getElementById("res-content");
    const actionButtons = document.getElementById("action-buttons");

    if (!codigo) {
        resBox.classList.remove("escondido");
        resBox.className = "resultado erro";
        resContent.innerHTML = "Digite um código válido.";
        actionButtons.classList.add("escondido");
        return;
    }

    try {
        const response = await fetch("certificados.json");
        const dados = await response.json();

        const registro = dados.find(item => item.codigo === codigo);

        if (!registro) {
            resBox.classList.remove("escondido");
            resBox.className = "resultado erro";
            resContent.innerHTML = `
                ❌ Código não encontrado.<br>
                Verifique se digitou corretamente.
            `;
            actionButtons.classList.add("escondido");
            return;
        }

        // Resultado positivo
        resBox.classList.remove("escondido");
        resBox.className = "resultado sucesso";

        resContent.innerHTML = `
            ✅ <strong>Certificado validado</strong><br><br>
            🔐 <strong>Código:</strong> ${registro.codigo}<br>
            👤 <strong>Participante:</strong> ${registro.nome}
        `;

        actionButtons.classList.remove("escondido");

        // Botões
        document.getElementById("btn-abrir").onclick = () => {
            window.open(registro.link, "_blank");
        };

        document.getElementById("btn-imprimir").onclick = () => {
            window.print();
        };

        document.getElementById("btn-novo").onclick = () => {
            location.reload();
        };

    } catch (err) {
        resBox.classList.remove("escondido");
        resBox.className = "resultado erro";
        resContent.innerHTML = "Erro ao carregar a base de dados.";
        actionButtons.classList.add("escondido");
    }
};
