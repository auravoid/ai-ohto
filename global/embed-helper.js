/**
 *
 * @description - Defers the reply to the interaction
 * @param {Object} interaction - The interaction object
 * @param {boolean} ephemeral - Whether the reply should be ephemeral
 * @returns {Promise<void>}
 */
async function defer(interaction, ephemeral = false) {
	await interaction.deferReply({ ephemeral: ephemeral });

	// If the interaction is a slash command, return
	if (interaction.isCommand()) return;

	// If the interaction is a context menu, edit the reply
	await interaction.editReply({
		content: 'Loading...',
		ephemeral: true,
	});

}

/**
 * @description - Sets a requested from string to the embed
 * @param {Object} interaction - The interaction object
 * @returns {String} - The string to be set
 * @example - setRequestedFrom(interaction, 'Requested by: {user} at {time}');
 */

function setRequestedFrom(interaction) {
	return `Requested by: ${interaction.user.tag} at ${new Date().toLocaleString()}`;
}

module.exports = {
	defer,
	setRequestedFrom,
};
