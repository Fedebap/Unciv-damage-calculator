document.getElementById("calculate-button").addEventListener("click", () => {
  const attackerStrength = parseInt(document.getElementById("attacker-strength").value);
  const attackerHealth = parseInt(document.getElementById("attacker-health").value);
  const defenderStrength = parseInt(document.getElementById("defender-strength").value);
  const defenderHealth = parseInt(document.getElementById("defender-health").value);

  function damage(attackerStrength, defenderStrength) {
    const attackerToDefenderRatio = attackerStrength / defenderStrength;

    const strongerToWeakerRatio = Math.pow(
      attackerToDefenderRatio,
      attackerToDefenderRatio < 1 ? -1 : 1 //if defender is stronger, inverts the ratio
    );

    const damageModifier = (Math.pow((strongerToWeakerRatio + 3) / 4, 4) + 1) / 2;

    let damageToAttacker, damageToDefender;

    if (attackerToDefenderRatio < 1) { //stronger troop recieves less damage
      damageToAttacker = damageModifier * 30;
      damageToDefender = Math.pow(damageModifier, -1) * 30;
    } else {
      damageToAttacker = Math.pow(damageModifier, -1) * 30;
      damageToDefender = damageModifier * 30;
    } 

    const healthDamagePenaltyAttacker = 1 - (100 - attackerHealth) / 300;
    const healthDamagePenaltyDefender = 1 - (100 - defenderHealth) / 300; 

    const finalDamageToAttacker = damageToAttacker * healthDamagePenaltyDefender;
    const finalDamageToDefender = damageToDefender * healthDamagePenaltyAttacker;

    return {
      finalDamageToAttacker: Math.round(finalDamageToAttacker),
      finalDamageToDefender: Math.round(finalDamageToDefender),
      finalDamageToAttackerMax: Math.round(finalDamageToAttacker * 1.2),
      finalDamageToDefenderMax: Math.round(finalDamageToDefender * 1.2),
      finalDamageToAttackerMin: Math.round(finalDamageToAttacker * 0.8),
      finalDamageToDefenderMin: Math.round(finalDamageToDefender * 0.8),
    };
  }

  const result = damage(attackerStrength, defenderStrength);

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
    Damage to defender: ~${result.finalDamageToDefender} (${result.finalDamageToDefenderMin}-${result.finalDamageToDefenderMax}) <br>
    Damage to attacker: ~${result.finalDamageToAttacker} (${result.finalDamageToAttackerMin}-${result.finalDamageToAttackerMax}) <br>
  `;
  resultElement.style.display = "block";
});
