function requesterIsAuthenticatedUser(requesterId, documentOwnerId) {
  return requesterId === documentOwnerId.toString();
}

module.exports = {
  requesterIsAuthenticatedUser
};
