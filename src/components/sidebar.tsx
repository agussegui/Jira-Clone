import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-sepator";
import Navigation from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

const Sidebar = () => {
    return (  
        <aside className="h-full bg-neutral-100 p-4 w-full ">
            <Link href="/" >
                <Image src="/logotask5.png" alt="logo" width={500} height={450} />
            </Link>
            <DottedSeparator className="my-4 "/>
            <WorkspaceSwitcher/>
            <DottedSeparator className="my-4 "/>
            <Navigation/>
            <DottedSeparator className="my-4 "/>
            <Projects/>
        </aside>
    );
}
 
export default Sidebar;