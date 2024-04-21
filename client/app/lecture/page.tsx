"use client";

import Voice, { MessageTranscript } from "../components/Voice";
import Slideshow, { skipToSlide } from "../components/Slideshow";
import { useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Sidebar from "../components/Sidebar";
import NavBar from "../navBar/NavBar";

function page() {
  const [retellClient, setRetellClient] = useState<RetellWebClient | undefined>(
    undefined
  );
  const [funcCallSocket, setFuncCallSocket] = useState<WebSocket | undefined>(
    undefined
  );

  const getSlideIndex = () => {
    const { searchParams } = new URL(window.location.href);
    const slide_index = searchParams.get("slideIndex");
    return slide_index ? parseInt(slide_index) : 0;
  };

  const testLecture: Lecture = {
    title: "Introduction to Red-Black Trees",
    description:
      "Exploring self-balancing binary search trees for efficient data storage and retrieval.",
    slides: [
      { title: "Red-Black Trees: What are they?", template_id: 4, images: [] },
      {
        title: "Binary Search Trees",
        template_id: 0,
        texts: [
          "Ordered binary trees",
          "Smaller items to the left",
          "Larger items to the right",
        ],
        speaker_notes:
          "Binary search trees are fundamental data structures that maintain order among their elements. Each node in the tree has at most two children, with smaller values residing in the left subtree and larger values in the right subtree. This property enables efficient searching, insertion, and deletion operations.",
        images: [
          {
            src: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221215114732/bst-21.png",
            description:
              "This image illustrates a Binary Search Tree (BST), where each node contains a value, and any left child node must have a value less than its parent node, while any right child node must have a value greater than its parent node. The tree is organized hierarchically starting with the root node at the top, which in this case is the number 8, and it progressively branches out according to the BST properties, which is relevant for understanding data structures in computer science that optimize search processes.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20221128124311/insertion.png",
            description:
              "The image illustrates the insertion of a node with the value 40 into a binary search tree (BST). The left diagram shows the initial state of the tree, and the right diagram shows the tree after the node 40 has been correctly inserted as a child of the node 30, following the rules of a BST that for any given node, values in the left subtree are smaller, and values in the right subtree are larger.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20230726182925/d1.png",
            description:
              "The image illustrates the process of deleting a leaf node from a Binary Search Tree (BST), specifically showing the deletion of node 20. It consists of two diagrams: the left diagram displays the initial BST, highlighting the target leaf node (20) for deletion, while the right diagram shows the BST post-deletion, where node 20 is removed and its parent no longer has that particular leaf, demonstrating the tree's structure preservation even after node deletion.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20220730030128/Screenshot20220730at30104AM-660x431.png",
            description:
              "The image depicts a binary search tree (BST), a fundamental data structure in computer science used for organizing comparable data in a manner that allows for efficient searches, insertions, and deletions. Each node in the BST (like the nodes labeled 100, 20, 200, etc.) contains a value and has two child nodes, where the left child's value is less than its parent's value and the right child's value is greater, thereby allowing for quick lookup times by effectively dividing the dataset in half with each step down the tree.",
          },
        ],
      },
      {
        title: "Balanced Search Trees",
        template_id: 2,
        texts: [
          "Guaranteed height of O(log n)",
          "Efficient search, insert, and delete",
        ],
        image: "balanced_search_tree.png",
        speaker_notes:
          "Balanced search trees address the potential issue of unbalanced binary search trees, where worst-case scenarios could lead to linear search times. By ensuring a balanced structure, these trees guarantee logarithmic time complexity for search, insertion, and deletion operations, making them highly efficient for managing ordered data.",
        images: [
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20221221160923/UntitledDiagramdrawio-660x371.png",
            description:
              "This image displays two diagrams illustrating examples of binary trees: a balanced binary tree on the left and an unbalanced binary tree on the right. Each node in the trees is labeled with a value and the depth 'd', calculated as the height of the left child minus the height of the right child, providing a visual comparison of structural differences between balanced and unbalanced binary trees in data structure contexts.",
          },
        ],
      },
      {
        title: "Red-Black Trees",
        template_id: 1,
        texts: [
          "Self-balancing binary search trees",
          "Nodes are either red or black",
          "Efficient operations with O(log n) time",
        ],
        image: "red_black_tree.png",
        speaker_notes:
          "Red-black trees are a specific type of balanced search tree that utilize node coloring to maintain balance. Each node is assigned either red or black color, and a set of properties govern the arrangement of these colors to ensure the tree remains balanced. This coloring scheme enables efficient operations while keeping the tree's height logarithmic with respect to the number of nodes.",
        images: [
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20200427100650/red-black-tree.png",
            description:
              "This image illustrates a red-black tree, a type of self-balancing binary search tree. Nodes in the tree are marked with colors (red or black), and the tree structure ensures that the path from the root to the leaves has balanced black nodes, making operations like insertion and deletion efficient.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20200506190350/output244.png",
            description:
              "This image depicts two diagrams illustrating the steps of right rotation and color swapping in a red-black tree. It shows the before and after stages of insertion and the necessary adjustments to maintain tree balance.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/rbdelete161-1024x704.png",
            description:
              "This image illustrates the rebalancing process of a red-black tree after a node deletion (node '10'), showing color changes and rotations needed to maintain the red-black tree properties.",
          },
          {
            src: "https://www.codesdope.com/staticroot/images/ds/rb20.png",
            description:
              "The image demonstrates rotation in red-black trees, crucial for maintaining tree balance during insertions and deletions by highlighting specific rotation scenarios and their impacts.",
          },
        ],
      },
      {
        title: "Red-Black Tree Properties",
        template_id: 9,
        texts: [
          "Root and leaves are black",
          "Red nodes have black children",
          "Equal black nodes on all paths",
        ],
        image: "red_black_tree_properties.png",
        speaker_notes:
          "Red-black trees adhere to a set of properties that maintain their balance and efficiency. The root node and all leaf nodes (null nodes) are always black. If a node is red, its children must be black. Additionally, all paths from a node to its descendant leaf nodes must contain the same number of black nodes, ensuring a balanced distribution of nodes.",
        images: [
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20200427100650/red-black-tree.png",
            description:
              "This image illustrates a red-black tree, showing how each node is colored either red or black. It demonstrates the tree's balancing properties, such as each red node having black child nodes, which is crucial for maintaining balance during insertions and deletions.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20220602135051/3NodedRedBlacktree.jpg",
            description:
              "The image depicts possible and impossible configurations of 3-noded Red-Black Trees. It contrasts correct structures that adhere to Red-Black Tree properties with incorrect ones, providing a clear visual explanation of what configurations violate the tree's fundamental rules.",
          },
          {
            src: "https://www.eecs.umich.edu/courses/eecs380/ALG/fig/rb_tree1a.gif",
            description:
              "This diagram shows a binary tree with nodes colored in red and black, which could represent different traits or categories in the structure, such as key nodes or endpoints of a search query. It's relevant for understanding how nodes are organized and differentiated in Red-Black Trees.",
          },
          {
            src: "https://walkccc.me/CLRS/img/13.1-1-2.png",
            description:
              "This image provides a detailed view of a binary tree with numerically labeled nodes from 1 to 15, where odd-numbered nodes are red and even-numbered nodes are black. This classification visually demonstrates how values are organized within the tree, which is useful for understanding data structures and algorithms.",
          },
        ],
      },
      {
        title: "Black Height",
        template_id: 0,
        texts: [
          "Number of black nodes on a path",
          "Excludes the root node",
          "Longest path is at most twice the shortest path",
        ],
        image: "black_height.png",
        speaker_notes:
          "The black height of a red-black tree refers to the number of black nodes on any path from the root to a leaf node, excluding the root itself. This property ensures that the tree remains balanced, as the longest possible path (alternating red and black nodes) can be at most twice as long as the shortest path (consisting only of black nodes).",
        images: [
          {
            src: "https://i.ytimg.com/vi/KSlrhcoFhCQ/maxresdefault.jpg",
            description:
              "The image illustrates the structure of a Red Black Tree, with an emphasis on its 'Black Height,' which refers to the number of black nodes from the root node to the leaf nodes, excluding the root. Each path from the root to a leaf node shows a consistent black height of 2, indicating the tree's balance, which is key to the performance of data operations like search, insert, and delete in balanced tree algorithms.",
          },
        ],
      },
      {
        title: "Operations on Red-Black Trees",
        template_id: 2,
        texts: [
          "Search, insert, and remove",
          "Rotations maintain balance",
          "Time complexity: O(log n)",
        ],
        image: "operations.png",
        speaker_notes:
          "Red-black trees support the standard binary search tree operations: search, insert, and remove. To maintain the red-black tree properties after insertions or deletions, rotations are performed to rebalance the tree. These operations have a logarithmic time complexity, ensuring efficiency even for large datasets.",
        images: [
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20200506190350/output244.png",
            description:
              "This image depicts the rotation and color swap steps necessary to maintain the balance of the tree after inserting a new node. It specifically illustrates the case where the uncle node is black, which is crucial for maintaining the required properties of Red-Black Trees.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/rbdelete161-1024x704.png",
            description:
              "The image shows the deletion of node 10 from a Red-Black Tree and the subsequent adjustments made to maintain the properties that define a Red-Black Tree. It includes transformations and rotations to ensure the tree remains balanced and adheres to its coloring and structural rules.",
          },
          {
            src: "https://www.codesdope.com/staticroot/images/ds/rb20.png",
            description:
              "This image displays a sequence of operations involving rotations in a Red-Black Tree. The rotations are crucial for re-establishing the tree's balance after modifications such as insertions or deletions.",
          },
          {
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20200427100759/output241.png",
            description:
              "This image illustrates the steps of balancing a red-black tree through rotations and color rearrangements following insertion or deletion operations. It shows changes in node colors and pointers, highlighting the dynamic adjustments needed to maintain tree balance.",
          },
        ],
      },
      {
        title: "Applications of Red-Black Trees",
        template_id: 9,
        texts: [
          "In-memory databases",
          "Associative arrays",
          "Implementation of ordered sets",
        ],
        image: "applications.png",
        speaker_notes:
          "Red-black trees find applications in various domains due to their efficiency and balanced nature. They are commonly used in in-memory databases, associative arrays (maps), and implementations of ordered sets and maps. Their guaranteed logarithmic time complexity makes them suitable for scenarios where fast search, insertion, and deletion operations are crucial.",
        images: [
          {
            src: "https://i.stack.imgur.com/CskhO.jpg",
            description:
              "Typically, Red-Black Trees in memory allocation help manage free memory blocks efficiently, allowing for quick allocation and deallocation of memory chunks.",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Red-black_tree_example_with_sockets.svg/316px-Red-black_tree_example_with_sockets.svg.png",
            description:
              "Red-Black Trees are used in database systems to enhance the speed of data retrieval through balanced tree structures, ensuring efficient indexing and quick access to data.",
          },
        ],
      },
    ],
  };

  const handleFuncCallResult = (result: FunctionCall) => {
    const curr_slide = getSlideIndex();
    switch (result.name) {
      case "next_slide":
        // If the slide is not the last one, skip to the next slide
        if (curr_slide + 1 < testLecture.slides.length) {
          skipToSlide(curr_slide + 1);
        }
        break;
      case "prev_slide":
        // If the slide is not the first one, skip to the previous slide
        if (curr_slide - 1 >= 0) {
          skipToSlide(curr_slide - 1);
        }
        break;
      case "goto_slide":
        const slide_number = result.arguments["slide_number"];
        // If the slide number is within the bounds of the slides array, skip to that slide
        if (slide_number >= 0 && slide_number < testLecture.slides.length) {
          skipToSlide(result.arguments["slide_number"]);
        }
        break;
    }
  };

  // Have the voice AI speak the slide speaker notes if you change slides
  const handleSlideChange = (slideIndex: number) => {
    console.log("Current slide number:", slideIndex);
    const slide = testLecture.slides[slideIndex];
    if (slide.speaker_notes) {
      funcCallSocket?.send(slide.speaker_notes);
    }
  };

  // When data socket connects, read first slide
  const handleDataSocketConnect = () => {
    setTimeout(() => {
      const slide_number = getSlideIndex();
      const slide = testLecture.slides[slide_number];
      console.log("CONVERSATION STARTED", slide);
      if (slide.speaker_notes) {
        funcCallSocket?.send(slide.speaker_notes);
      }
    }, 5000);
  };

  // If last message equals current slide speaker notes, slide has finished so time to move oon
  const handleUpdate = (update: { transcript: MessageTranscript[] }) => {
    const lastMessage = update.transcript[update.transcript.length - 1];

    const slide_number = getSlideIndex();
    const speaker_notes = testLecture.slides[slide_number].speaker_notes;

    if (lastMessage.content.includes(speaker_notes!)) {
      // If the slide is not the last one, skip to the next slide
      if (slide_number + 1 < testLecture.slides.length) {
        setTimeout(() => {
          skipToSlide(slide_number + 1);
        }, 2500);
      }
    }
  };

  return (
    <main className="flex flex-col h-full w-full">
      <PanelGroup direction="vertical">
        <Panel defaultSize={95}>
          <PanelGroup direction="horizontal">
            <Panel minSize={25} defaultSize={75}>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold py-4">{testLecture.title}</h1>
                <div className="w-full h-fit relative">
                  <div className="absolute z-10 top-0 left-0 w-full h-full bg-white/75 flex items-center justify-center">
                    <Voice
                      onFuncCallResult={handleFuncCallResult}
                      onDataSocketConnect={handleDataSocketConnect}
                      funcCallSocket={funcCallSocket}
                      retellClient={retellClient}
                      setFuncCallSocket={setFuncCallSocket}
                      setRetellClient={setRetellClient}
                      onUpdate={handleUpdate}
                    />
                  </div>
                  <Slideshow
                    lecture={testLecture}
                    onSlideChange={handleSlideChange}
                  />
                </div>
                <h3 className="text-lg text-center">
                  Ask questions about this by interrupting the lecture
                </h3>
              </div>
            </Panel>
            <PanelResizeHandle />
            <Panel id="sidebar" minSize={25} defaultSize={25}>
              <Sidebar />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel collapsible={true} defaultSize={5}>
          <h1></h1>
        </Panel>
      </PanelGroup>
    </main>
  );
}

export default page;