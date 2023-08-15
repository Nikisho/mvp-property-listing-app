import { supabase } from "../../supabase";
//Reusable function to fetch any user's data.
const fetchUserData = async (uid: string) => {

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('user_uid', `${uid}`);
    if (data) return data![0];
    if (error) console.error(error.message);
};

export { fetchUserData };