const { response, response2, response3, response4, response5 } = require('../response.js');

const searchNft = (query) => {
  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  const results = data.filter(el => {
    const { name, description, token_id, contract, collection, creator } = el;

    const fullText = `${name} ${description} ${token_id} ${contract.name} ${contract.type} ${collection.name} ${collection.description} ${collection.slug} ${creator.username}`;

    return fullText.indexOf(query) >= 0;
  });

  return results;
}

const getNftCollection = (page, sales) => {
  if(sales) {

    const data = [
      ...response.assets,
      ...response2.assets,
      ...response3.assets,
      ...response4.assets,
      ...response5.assets,
    ];

    const sortedData = data.sort((a, b) => {
      if (a.sales > b.sales)
         return -1;
      if (a.sales < b.sales)
         return 1;
      return 0;
    });

    switch (page) {
      case "1":
        return {
          assets: sortedData.slice(0, 20),
          next: 2,
          previous: 1,
        };
      case "2":
        return {
          assets: sortedData.slice(20, 40),
          next: 3,
          previous: 1,
        };
      case "3":
        return {
          assets: sortedData.slice(40, 60),
          next: 4,
          previous: 2,
        };
      case "4":
        return {
          assets: sortedData.slice(60, 80),
          next: 5,
          previous: 3,
        };
      case "5":
        return {
          assets: sortedData.slice(80),
          next: 5,
          previous: 4,
        };
      default:
        return {
          assets: sortedData.slice(0, 20),
          next: 2,
          previous: 1,
        };
    }

  }
  else {
    switch (page) {
      case "1":
        return response;
      case "2":
        return response2;
      case "3":
        return response3;
      case "4":
        return response4;
      case "5":
        return response5;
      default:
        return response;
    }
  }
}

const getOneNft = (id) => {

  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  return data.find(el => el.id == id);

}

const getCollectionsCollection = () => {
  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  return data.map(el => el.collection);
}

const getNftByCollection = (slug) => {

  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  const collection = data.map(el => el.collection).find(el => el.slug == slug);
  const nfts = data.filter(el => el.collection.slug === slug);

  return {
    collection,
    assets: nfts
  };

}

const getCreators = () => {
  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  return data.map(el => el.creator);
}

const getNftByCreator = (username) => {

  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  const creator = data.map(el => el.creator).find(el => el.username == username);
  const nfts = data.filter(el => el.creator.username === username);

  return {
    creator,
    assets: nfts
  };

}


const getOwners = () => {
  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  return data.map(el => el.owner);
}

const getNftByOwner = (username) => {

  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  const owner = data.map(el => el.owner).find(el => el.username == username);
  const nfts = data.filter(el => el.owner.username === username);

  return {
    owner,
    assets: nfts
  };

}

module.exports = {
  searchNft,
  getNftCollection,
  getOneNft,
  getCollectionsCollection,
  getNftByCollection,
  getCreators,
  getNftByCreator,
  getOwners,
  getNftByOwner
};

