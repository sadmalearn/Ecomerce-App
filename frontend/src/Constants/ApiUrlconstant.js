import { getActiveProfile } from '../Profiles/profile'
import ProfileConstant from './ProfileConstants'

const baseURL = getActiveProfile(ProfileConstant.Dev);

export const url = {
    login : baseURL + "login",
}