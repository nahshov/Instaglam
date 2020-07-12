// eslint-disable-next-line implicit-arrow-linebreak
function requesterIsAuthenticatedUser(requesterId, documentOwnerId) {
  return requesterId === documentOwnerId.toString();
}

module.exports = {
  requesterIsAuthenticatedUser
};
