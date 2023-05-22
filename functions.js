// Defaul Character 
const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

// Objeto Cavaleiro
const createKnight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life:100,
        maxLife:100,
        attack: 10,
        defense: 8
    }
}

// Objeto Mago
const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 15,
        defense: 3
    }
}

// Objeto Pequeno Monstro
const createLitterMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Little Monster',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

// Objeto Grande Monstro
const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Bit Monster',
        life: 130,
        maxLife: 130,
        attack: 18,
        defense: 6
    }
}

// Objeto Estado do Jogo
const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1El = fighter1El
        this.fighter2El = fighter2El

        // Adiciona o evento para monitorar os cliques de ataques
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2) )
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1) )

        this.update();
    },

    update() {

        // Manipulação das infos do lutador um
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`
        let f1Pct = this.fighter1.life / this.fighter1.maxLife * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`


        // Manipulação das infos do lutador dois
        this.fighter2El.querySelector('.name').innerHTML =  `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`
        let f2Pct = this.fighter2.life / this.fighter2.maxLife * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`

    },

    doAttack(attacking, attacked) {

        // Verifica se o Jogo não acabou
        if (attacking.life <= 0 || attacked.life <= 0) {

            // Adiciona info no log
            log.addMessage("Fim de Jogo");

            return;
        }

        // Calcula um valor random para ser usado no poder de ataque
        let attackFactor = (Math.random() * 2).toFixed(2);

        // Calcula um valor random para ser usado na defesa
        let defenseFactor = (Math.random() * 2).toFixed(2);

        // Multiplica o valor random de ataque com o poder de attack para um valor final
        let actualAttack = attacking.attack * attackFactor; 

        // Multiplica o valor random de defesa com o poder de defense para um valor final
        let actualDefense = attacked.defense * defenseFactor;

        // Verifica se é maior o valor do ataque para atualizar os dados
        if (actualAttack > actualDefense) {

            // Diminui o valor de ataque do lutador atacado
            attacked.life -= actualAttack;

            if (attacked.life < 0)
                attacked.life = 0

            // Adiciona info no log
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);

        } else {

            // Adiciona info no log
            log.addMessage(`${attacked.name} conseguiu se defender...`);

        }

        // Update das infos
        this.update();

    }

}

// Objeto do log das ações do Jogo
const log = {
    list: [],

    addMessage(msg) {
        this.list.push(msg); 
        this.render();
    },

    render() {

        const logEl = document.querySelector('.log')
        logEl.innerHTML = ''

        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`
        }

    }
}
