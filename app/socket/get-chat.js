const getChats = () => context => {
  const userId = context.getCurrentUserId()

  return Chat.find({ participants: userId })
    .populate('participants')
    .populate('messages')
}

export default getChats