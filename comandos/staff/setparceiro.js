var database = require('../../database.js')

exports.run = (client, message, args) => {

    const parceiroRole = message.guild.roles.get('622179166133026817'); // Parceiros

    database.Users.findOne({
        '_id': message.author.id
    }, function (derro, developer) {
        if (developer) {
            if (developer.owner) {
                if (message.mentions.users.size < 1) {
                    message.channel.sendMessage('Por favor, mencione o usuário.')
                } else {
                    database.Users.findOne({
                        '_id': message.mentions.users.first().id
                    }, function (erro, usuario) {
                        if (usuario) {
                            if (usuario.parceiro) {
                                usuario.parceiro = false
                                usuario.save()
                                message.reply(`O usuário **<@${message.mentions.users.first().id}>** não é mais **parceiro!**`)
                                usuario.removeRole(parceiroRole).catch(console.error);
                            } else {
                                usuario.parceiro = true
                                usuario.timevip = Date.now()
                                usuario.save()
                                message.reply(`O usuário **<@${message.mentions.users.first().id}>** se tornou **parceiro!**`)
                                usuario.addRole(parceiroRole).catch(console.error);
                            }
                        } else {
                            message.channel.sendMessage('Ocorreu um erro ao executar este comando.')
                        }
                    })
                }
            } else {
                message.reply('Sem permissão.')
            }
        } else {
            message.channel.sendMessage('Ocorreu um erro ao executar este comando.')
        }
    })
}

exports.help = {
    name: 'setparceiro'
}