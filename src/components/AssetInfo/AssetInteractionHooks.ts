import { getTokenUserAddress } from "../../reducers/token";

export function useAssetInteraction = () => {
    const dispatch = useDispatch()
    const isTitleEscrow = () => dispatch({ type: 'UPDATE_QUERY', payload: query })
    const getTokenUsers = () => dispatch(getTokenUserAddress());
    return { query, updateQuery, getTokenUsers }
  }