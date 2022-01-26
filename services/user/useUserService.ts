
interface UserService {
  createUser: (user: string) => any;
  deleteUser: (user: string) => void;
}

const useUserService = (): UserService => {

  const createUser = (user) => {
    return `${user} created`
  }

  const deleteUser = (user) => {
    return `${user} deleted`
  }
  return {
    createUser,
    deleteUser
  }
}

export default useUserService;
