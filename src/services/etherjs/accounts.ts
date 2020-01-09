// Wrap provider.listAccounts in a Promise
export const getAccounts = provider =>
  new Promise((resolve, reject) => {
    provider.listAccounts()
        .then(accounts => resolve(accounts)
        .catch(error => reject(error));
  });

export default getAccounts;