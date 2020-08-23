function getDiscordUser (req, res) {
  if (!req.session.discordUser) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  return res.json(req.session.discordUser)
};

module.exports = {
  getDiscordUser
}
