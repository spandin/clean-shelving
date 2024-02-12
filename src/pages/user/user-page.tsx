import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { db } from "@/shared/api/firebase-config";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";

import { BsGear } from "react-icons/bs";

import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { UserData } from "@/entities/user";

export default function UserPage() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [user, setUser] = useState<DocumentData>({});

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", `${userId}`),
      (doc: DocumentData) => {
        const user = doc.data();

        setUser(user);
      }
    );
    () => unsub();
  }, [userId]);

  console.error(userId);

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__wrapper__header">
          <HeaderInformer title="Пользователь" subtitle={user.email} />
          <button
            className="circle_button"
            onClick={() => navigate("/settings/")}
          >
            <BsGear />
          </button>
        </div>

        <UserData user={user} />
      </div>
    </div>
  );
}
