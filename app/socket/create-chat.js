const createChat = async ([userId, participantId]) => {
  const participant = await User.findById(participantId)

  if (participant) {
    const existingChat = await Chat.exists({
      $and: [
        { participants: userId },
        { participants: participantId },
      ],
    })

    if (!existingChat) {
      return Chat.create({ participants: [userId, participantId] })
    }
  }
}

export default createChat