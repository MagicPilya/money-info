import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

export default function useProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth,function(user) {
      if (!user) {
        console.error(
          'Access to protected route denied, redirecting to login...'
        );
        navigate('/sign-in');
      }
    });
  }, [navigate]);
}