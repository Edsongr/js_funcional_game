/**
 * @author Edsongr <edsongrdeveloper@gmail.com>
 * 
 * Create By Edsongr to test OOP in JS - Funcional
 */

// Cria o Objeto Cavaleiro
const char = createKnight("Edson")

// Cria o Objeto Pequeno Mostro
const monster = createLitterMonster()

// Inicia o Jogo
stage.start(
    char, 
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
)
