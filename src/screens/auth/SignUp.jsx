import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {logo} from '../../assets';
import {CustomButton, FormField} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {createUser} from '../../lib/appwrite';
import {useGlobalContext} from '../../context/GlobalProvider';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setIsLogged, setUser} = useGlobalContext();
  const navigation = useNavigation();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Missing Fields', 'Please fill in all the fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createUser(form.email, form.password, form.username);
      // set it to global state using context api
      setUser(result);
      setIsLogged(true);

      navigation.navigate('Tabs');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaProvider className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 font-semibold">
            Welcome to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={e => setForm({...form, username: e})}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({...form, email: e})} // destructure the existing form values and modify the email, set to e
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => setForm({...form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton
            btnTitle="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row items-center gap-2">
            <Text className="text-lg text-gray-100 font-medium">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-lg text-secondary font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default SignUp;
