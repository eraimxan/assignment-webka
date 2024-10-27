document.getElementById('submit').addEventListener('click', () => {
    let name = document.getElementById('name').value.trim();
    let price = parseFloat(document.getElementById('startingBid').value);

    if (!name || isNaN(price)) {
        alert("Please enter a valid name and starting bid.");
        return;
    }

    // Education coefficient
    let educationCoeff = parseFloat(document.getElementById('education').value);
    price *= educationCoeff;

    // Family net worth coefficient
    let netWorthCoeff = parseFloat(document.getElementById('netWorth').value);
    price *= netWorthCoeff;

    // Caste value
    let casteValue = parseFloat(document.getElementById('caste').value);
    price += casteValue;

    // Skills
    const skills = document.querySelectorAll('.skill');
    let skillValue = Array.from(skills)
        .filter(skill => skill.checked)
        .reduce((sum, skill) => sum + parseFloat(skill.value), 0);
    price += skillValue;

    // Age coefficient
    const ageRadios = document.querySelectorAll('input[name="age"]');
    ageRadios.forEach(ageRadio => {
        if (ageRadio.checked) {
            let ageCoeff = parseFloat(ageRadio.value);
            price *= ageCoeff;
        }
    });

    // Reputation coefficient
    const reputations = document.querySelectorAll('.reputation');
    reputations.forEach(rep => {
        if (rep.checked) {
            price *= parseFloat(rep.value);
        }
    });

    // General gossip penalty
    if (document.getElementById('generalGossip').checked) {
        price -= 20;
    }

    // Love letter
    let loveLetter = document.getElementById('loveLetter').value;

    // Create result object
    let person = {
        name: name,
        price: price.toFixed(2),
        loveLetter: loveLetter
    };

    // Display result
    document.getElementById('result').innerHTML = `
        <p>The dowry price for ${person.name} is $${person.price}.</p>
        <p>Your Love Letter: ${person.loveLetter}</p>
    `;
});
