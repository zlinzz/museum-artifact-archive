const PUBLIC_PATHS = ['/register', '/login', '/', '/_error'];

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { favouritesAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";

export default function RouteGuard(props) {
    const [authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const router = useRouter();

    async function updateAtoms() {
        setFavouritesList(await getFavourites()); 
        setSearchHistory(await getHistory()); 
    }

    useEffect(()=>{
        updateAtoms()
        
        authCheck(router.pathname);

        router.events.on('routeChangeComplete', authCheck );

        return () => {
            router.events.off('routeChangeComplete', authCheck);
          };
    }, [])

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
    }
    
    return <>
        {authorized && props.children}
    </>
  }