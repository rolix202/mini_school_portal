import { Fragment, createContext, useEffect, useState, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Navigate,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import handleServerError from "../../../utils/handleServerError";
import "animate.css";
import rolandImg from "../../assets/roland.jpg";
import logo from "../../assets/logo.png";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { navigation } from "../../../utils/constants";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardContext = createContext();

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [navigationItems, setNavigationItems] = useState(navigation);
  const [currentUser, setCurrentUser] = useState(null);
 
 
  useEffect(() => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === pathname,
    }));
    setNavigationItems(updatedNavigation);
  }, [pathname]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
          const response = await customFetch.get("/current-user");
          const userData = response.data;
          setCurrentUser(userData)
          
        } catch (error) {
          navigate('/login')
        } 
    }

    if (!currentUser){
      fetchCurrentUser()
    }
    
  }, []);

  const handleLogOut = async () => {
    try {
      await customFetch.get("/auth/logout");
      navigate("/login");
      toast.success("Logged Out Successfully");
    } catch (error) {
      handleServerError(error);
    }
  };

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", onclick: handleLogOut },
  ];

  const fullName = currentUser?.data?.currentUser.fullName;

  const user = {
    name: fullName
      ? fullName
          .split(" ")
          .map((eachName) => {
            return eachName[0].toUpperCase() + eachName.substring(1);
          })
          .join(" ")
      : "",
    email: currentUser?.data?.currentUser.email,
    imageUrl: rolandImg,
  };

  return (
    <DashboardContext.Provider value={{ currentUser }}>
   
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              {/* Menus set up on large screen */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>

                    {/* Normal nav menus, hidden on small screen and visible on large screen */}
                    <div className="hidden lg:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigationItems.map((item, index) => {
                          if (
                            item.name === "Staffs" &&
                            currentUser?.data?.currentUser.role !== "admin"
                          )
                            return;

                          return (
                            <div key={item.name}>
                              {item.submenus ? (
                                <Menu as="div" className="relative">
                                  <Menu.Button
                                    className={classNames(
                                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                                      "group flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md relative"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                    <ChevronDownIcon
                                      className={classNames(
                                        "text-gray-400",
                                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>

                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-left bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {item.submenus.map((submenu) => (
                                        <Menu.Item key={submenu.name}>
                                          {({ active }) => (
                                            <a
                                              href={submenu.href}
                                              className={classNames(
                                                submenu.current
                                                  ? "bg-gray-900 text-white"
                                                  : "text-gray-700 hover:bg-gray-700 hover:text-white",
                                                " px-3 py-2 text-sm font-medium block",
                                                active ? "bg-gray-700 text-white" : ""
                                              )}
                                              aria-current={
                                                submenu.current
                                                  ? "page"
                                                  : undefined
                                              }
                                            >
                                              {submenu.name}
                                            </a>
                                          )}
                                        </Menu.Item>
                                      ))}
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              ) : (
                                // Render a regular menu item
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "rounded-md px-3 py-2 text-sm font-medium"
                                  )}
                                  aria-current={
                                    item.current ? "page" : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Notification icon, hidden on small screen and visible on large screen */}

                  <div className="hidden lg:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown options */}

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    onClick={item.onclick}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  {/* Mobile menu button */}
                  <div className="-mr-2 flex lg:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              {/* Mobile menu display on small screen, hidden on large screen */}
              <Disclosure.Panel className="lg:hidden"> 
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      {item.submenus ? (
                        <Menu as="div" className="relative">
                          <Menu.Button
                            className={classNames(
                              "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md relative"
                            )}
                          >
                            {item.name}
                            <ChevronDownIcon
                              className={classNames(
                                "text-gray-400",
                                "ml-2 h-5 w-5 group-hover:text-gray-500"
                              )}
                              aria-hidden="true"
                            />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                              {item.submenus.map((submenu) => (
                                <Menu.Item key={submenu.name}>
                                  {({ active }) => (
                                    <a
                                      href={submenu.href}
                                      className={classNames(
                                        submenu.current
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                                        "block px-4 py-2 text-base font-medium"
                                      )}
                                    >
                                      {submenu.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        // Render a regular menu item
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Your content */}
        <Outlet />
      </div>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);
