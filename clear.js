const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Usun dana ilosc ostatnich wiadomosci (od 1 do 1000 max)")
        .addIntegerOption(option =>
            option
                .setName("ilosc")
                .setDescription("Jaka ilosc chcesz usunac?")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(1000)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages), 

    async execute(interaction) {
        const amount = interaction.options.getInteger("ilosc");
        const channel = interaction.channel;

        const messages = await channel.bulkDelete(amount, true);

        await interaction.reply({
            content: `> \`🧹\`  Usunieto **${messages.size}** wiadomosci`,
            ephemeral: true
        });
    }
};
