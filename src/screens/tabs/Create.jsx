import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';

import {FormField, CustomButton} from '../../components';
import {upload} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {createVideo} from '../../lib/appwrite';
import {useGlobalContext} from '../../context/GlobalProvider';

const Create = () => {
  const {user} = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
  });
  const navigation = useNavigation();

  // upload actual file from phone to appwrite storage bucket
  const openPicker = async (selectType, field) => {
    try {
      let fileType;

      switch (selectType) {
        case 'image':
          fileType = [DocumentPicker.types.images];
          break;
        case 'video':
          fileType = [DocumentPicker.types.video];
          break;
        default:
          fileType = [DocumentPicker.types.allFiles];
          break;
      }

      // open the document picker
      const result = await DocumentPicker.pick({
        type: fileType,
        allowMultiSelection: false, // change to trueif you want to allow multi selection
      });

      console.log('result: ' + JSON.stringify(result));

      setForm(prevForm => ({
        ...prevForm,
        [field]: result[0], // Assuming only one file is selected
      }));
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('user cancelled the file upload');
      } else {
        console.log('error while picking the file: ' + JSON.stringify(error));
      }

      return {
        success: false,
        error,
      };
    }
  };
  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail) {
      Alert.alert('Missing Fields', 'Please fill in all the fields.');
      return;
    }

    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert('Success', 'Video uploaded successfully');
      navigation.navigate('Tabs');
    } catch (error) {
      console.log(
        'src :: screens :: tabs :: Create :: submit :: error: ',
        error,
      );
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaProvider className="bg-primary h-full">
      <ScrollView
        // contentContainerStyle={{height: '100%'}}
        className="px-4 my-6">
        <Text className="text-2xl font-semibold text-white ">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catching title..."
          handleChangeText={text => setForm({...form, title: text})}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-7">
          <Text className="text-base text-gray-100 font-medium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video', 'video')}>
            {form.video ? (
              <Video
                source={{uri: form.video.uri}}
                className="w-full h-64 rounded-2xl"
                controls
                paused={false}
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-40 px-4 rounded-2xl bg-black-100 flex justify-center items-center">
                <View className="w-14 h-14 border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-medium">
            Upload Thumbnail
          </Text>

          <TouchableOpacity onPress={() => openPicker('image', 'thumbnail')}>
            {form.thumbnail ? (
              <Image
                source={{uri: form.thumbnail.uri}}
                className="w-full h-40 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 rounded-2xl bg-black-100 flex justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm font-medium text-gray-100">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          btnTitle="Upload and Go Live"
          containerStyles="mt-10"
          handlePress={submit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Create;
