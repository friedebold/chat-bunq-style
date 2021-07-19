import { ChatUser, User } from "./model"

export const fetchUsers = async () => {
  return fetch('http://assignment.bunq.com/users')
    .then(jsonResponse => jsonResponse.json())
    .then((users: User[]) => users)
}

export const fetchLastSeen = async (conversationId: string, userId: string) => {
  return fetch(`http://assignment.bunq.com/conversation/${conversationId}/lastseen/${userId}`)
    .then(jsonResponse => jsonResponse.json())
    .then((response) => response)
    .catch(err => console.log(err))
}

export const fetchConversations = async (userId: string) => {
  //It would be better to be subscribed to a stream of conversationUpdates
  //that way no refresh needed if new conversation started by not activeUser

  return fetch(`http://assignment.bunq.com/conversation/user/${userId}`)
    .then(jsonResponse => jsonResponse.json())
    .then((conversations) => conversations)
    .catch(err => console.log(err))
}

export const createPersonalConversation = async (receiverId: string, userId: string,) => {
  const bodyData = receiverId + ',' + userId
  return fetch('http://assignment.bunq.com/conversation/personal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ users: bodyData })
  })
    .then(jsonResponse => jsonResponse.json())
    .then(newConversation => newConversation.id)
    .catch(err => console.log(err))
}

export const createGroupConversation = async (receiverIds: string, userId: string, groupName: string) => {
  const bodyData = receiverIds + ',' + userId
  return fetch('http://assignment.bunq.com/conversation/group', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      users: bodyData,
      name: groupName
    })
  })
    .then(jsonResponse => jsonResponse.json())
    .then((newConversation) => newConversation.id)
    .catch(err => console.log(err))
}

export const markConversationAsSeen = async (conversationId: string, userId: string) => {
  return fetch(`http://assignment.bunq.com/conversation/${conversationId}/seen/${userId}`, {
    method: 'PUT',
  })
    .catch(err => console.log(err))
}

const awaitJson = (responses: Response[]) => Promise.all(responses.map(response => {
  if (response.ok) return response.json();
  return (err: Error) => console.log(err);
}));

export const fetchUsersAndLastSeen = async (users: ChatUser[], conversationId: string) => {
  let promises = []
  for (let i = 0; i < users.length; i++) {
    promises.push(fetch(`http://assignment.bunq.com/user/${users[i].userid}`))
    promises.push(fetch(`http://assignment.bunq.com/conversation/${conversationId}/lastseen/${users[i].userid}`))
  }
  return Promise.all(promises)
    .then(awaitJson)
    //store userData temporarily to combine userData and lastSeen
    .then(responses => {
      let userArr: any = []
      let tempUserData = {}
      responses.forEach((result, index) => {
        if (index % 2 === 0) tempUserData = result
        userArr[Math.floor(index / 2)] = { ...tempUserData, ...result }
      })
      return userArr
    })
    .catch(err => console.log(err))
}

export const sendMessage = async (conversationId: string, senderId: string, message: string) => {
  return fetch(`http://assignment.bunq.com/conversation/${conversationId}/message/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: message.trim(),
      senderId: senderId
    })
  })
    .then(jsonResponse => jsonResponse.json())
    .then(response => response)
    .catch((err: Error) => console.log(err))

}

export const getLast100Messages = async (conversationId: string, offset: number) => {
  return fetch(`http://assignment.bunq.com/conversation/${conversationId}/message/limited?limit=100&offset=${offset}`)
    .then(jsonResponse => jsonResponse.json())
    .then(response => response)
    .catch((err: Error) => console.log(err))
}

export const fetchNewMessages = async (conversationId: string, lastMsgId: string) => {
  return fetch(`http://assignment.bunq.com/conversation/${conversationId}/new/${lastMsgId}`)
    .then(jsonResponse => jsonResponse.json())
    .then(response => response)
    .catch((err: Error) => console.log(err))
}