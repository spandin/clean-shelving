import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { db } from "@/lib/firebase";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";

import { BsGear } from "react-icons/bs";

import Informer from "@/components/common/informer/informer";

import IMAGES from "@/assets/images";

export default function UserId() {
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

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__wrapper__header">
          <Informer title="Пользователь" subtitle={user.email} />
          <button
            className="circle_button"
            onClick={() => navigate("/settings/")}
          >
            <BsGear />
          </button>
        </div>

        <div className="profile__wrapper__body">
          <ul className="tabs">
            <li className="tabs__tab">
              <input type="radio" name="tabs" id="tab-1" defaultChecked />
              <label htmlFor="tab-1">Информация</label>
              <div className="tabs__tab__content">
                <img id="user_avatar" src={IMAGES.user_avatar} />

                <div className="tabs__tab__content__user-info">
                  <h2>{user.name}</h2>
                  <p>{user.role}</p>
                </div>

                <div className="tabs__tab__content__user-actions">
                  <div className="tabs__tab__content__user-actions__col">
                    <span>ADD:</span>
                    <span>{user.actions && user.actions.added}</span>
                  </div>

                  <div className="tabs__tab__content__user-actions__col">
                    <span>UPD:</span>
                    <span>{user.actions && user.actions.updated}</span>
                  </div>

                  <div className="tabs__tab__content__user-actions__col">
                    <span>DEL:</span>
                    <span>{user.actions && user.actions.deleted}</span>
                  </div>
                </div>
              </div>
            </li>
            <li className="tabs__tab">
              <input type="radio" name="tabs" id="tab-2" />
              <label htmlFor="tab-2">Активность</label>
              <div className="tabs__tab__content">Функция в разработке</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
