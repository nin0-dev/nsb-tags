export function getName() {
	return (
		discord.member.nick || discord.user.global_name || discord.user.username
	);
}
