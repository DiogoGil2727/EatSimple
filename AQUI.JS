document.addEventListener('DOMContentLoaded', function () {
    const confirmButton = document.querySelector('button[type="submit"]');

    confirmButton.addEventListener('click', function () {
        const numDays = parseInt(localStorage.getItem('numeroDias'), 10);
        if (isNaN(numDays) || numDays <= 0) {
            alert("Erro: numDays não está definido ou não é válido no localStorage.");
            return;
        }

        const highlightedDayElements = document.querySelectorAll('.day.highlight');

        if (highlightedDayElements.length === 0) {
            alert("Erro: Nenhum dia selecionado.");
            return;
        }

        const selectedDays = [];
        highlightedDayElements.forEach(dayElement => {
            const selectedDay = parseInt(dayElement.textContent.trim(), 10);
            if (!isNaN(selectedDay)) {
                selectedDays.push(selectedDay);
            }
        });

        const currentMonth = currentDate.getMonth();  // Mês atual (0 a 11)
        const currentYear = currentDate.getFullYear();  // Ano atual
        const daysToSave = new Set();  // Usar um Set para evitar duplicação
        let daysSaved = 0;  // Contador de dias salvos

        selectedDays.forEach(day => {
            for (let i = 0; i < numDays; i++) {
                if (daysSaved >= numDays) {
                    // Se atingimos o número máximo de dias, paramos
                    return;
                }

                const nextDay = new Date(currentYear, currentMonth, day + i);
                
                // Formatar o dia
                const dayFormatted = `${nextDay.getDate()}-${currentMonth + 1}`;

                // Adicionar ao Set para evitar duplicação
                daysToSave.add(dayFormatted);
                daysSaved++;  // Incrementar o contador de dias salvos
            }
        });

        // Recuperar os dias existentes no localStorage
        let existingDays = JSON.parse(localStorage.getItem('selectedDays')) || [];

        // Adicionar os novos dias ao Set (sem duplicação)
        daysToSave.forEach(day => {
            if (!existingDays.includes(day)) {
                existingDays.push(day);
            }
        });

        // Salvar os dias no localStorage
        localStorage.setItem('selectedDays', JSON.stringify(existingDays));

        alert(`Os seguintes dias foram salvos no localStorage: ${Array.from(daysToSave).join(", ")}`);
        console.log("Dias no localStorage:", existingDays);
    });
});