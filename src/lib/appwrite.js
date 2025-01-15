import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'appwrite';
import RNBlobUtil from 'react-native-blob-util';

// hook ups to our appwrite cloud
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1', // this is there hoisted version of the platform, but appwrite is completely open and allows self hoisting as well
  platform: 'com.sudamaSol.aora',
  projectId: '677f841b001962f1a88b',
  databaseId: '677f88a30025799d9113', // database sudama sol
  userCollectionId: '677f88de00060a0e90c7',
  videoCollectionId: '677f8929003b915f3d41',
  storageId: '677f8d920028434aa4f4',
};

// initigrate appwrite
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw new Error('Failed to create user');

    // on successful account creation, create a new profile picture
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error('Failed to sign in');
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('Failed to get current user');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    );

    if (!currentUser.documents.length) throw new Error('User not found');

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))],
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPosts = async userId => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('userId', userId)],
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, fileType) => {
  let fileUrl;

  try {
    if (fileType === 'video') {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (fileType === 'image') {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        'top',
        100,
      );
    } else {
      throw new Error('Invalid file type');
    }

    if (!fileUrl) throw new Error('Failed to get file preview');

    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const uploadFile = async (file, fileType) => {
  if (!file) return null;

  console.log('src :: lib :: appwrite :: uploadFile :: file :: ', file);
  try {
    // Resolve content URI to an actual file path
    const filePath = await RNBlobUtil.fs.stat(file.uri);
    const resolvedPath = filePath.path;

    // Generate a unique file ID
    const uniqueId = ID.unique();
    console.log('Generated unique ID:', uniqueId);

    // Use RNBlobUtil to upload the file as a multipart form data
    const uploadFileResponse = await RNBlobUtil.fetch(
      'POST', // Replace with Appwrite's API endpoint for file upload
      `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.storageId}/files`,
      {
        Authorization: `Bearer standard_9a9081fcb74567e29fe89727afa62205f94b7f782bf08a00c814a96621db5d2cbf3f7c6ac959952adf79afc6ecf6c49e4724088e8e9853cbd1819630e56506a766ba1b6ee33828e10d1ab736e74463ce41470bc6a9502792e43ad9dde6be7e549aa28e50981bee51bc730e423fa22c53a303db9ab5ec1ef2f4cc01cf11dc9e0c`, // Replace with your Appwrite API key
        'Content-Type': 'multipart/form-data',
        'x-appwrite-project': appwriteConfig.projectId, // Add this if not already present
      },
      [
        {name: 'fileId', data: uniqueId}, // Explicitly pass the fileId
        {
          name: 'file',
          filename: file.name,
          type: file.type,
          data: RNBlobUtil.wrap(resolvedPath),
        },
      ],
    );

    const responseJson = JSON.parse(uploadFileResponse.data);
    console.log('Upload response:', responseJson);

    if (!responseJson.$id) {
      throw new Error('Failed to upload file: Missing file ID in response.');
    }

    const fileUrl = await getFilePreview(responseJson.$id, fileType);
    console.log('Generated file URL:', fileUrl);

    return fileUrl;
  } catch (error) {
    // console.error('Upload file error:', error.message, error.stack);
    throw new Error(error);
  }
};
export const createVideo = async form => {
  try {
    // upload the thumbnail and video and return the urls of both at the same time
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPosts = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        user: getCurrentUser().accountId,
      },
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
