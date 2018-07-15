import web3 from "./web3";

const address = "0x705a328ec1d5c7d6046cf595fb1f15dffa41d1d1";
const abi = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "proposals",
    outputs: [
      {
        name: "proposalId",
        type: "uint256"
      },
      {
        name: "proposalType",
        type: "bytes32"
      },
      {
        name: "proposer",
        type: "address"
      },
      {
        name: "addressValue",
        type: "address"
      },
      {
        name: "stringValue",
        type: "string"
      },
      {
        name: "numValue",
        type: "uint256"
      },
      {
        name: "endDate",
        type: "uint256"
      },
      {
        name: "voteQuorum",
        type: "uint256"
      },
      {
        name: "closed",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "members",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "memberCount",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "votingPowerFor",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_minimumBalance",
        type: "uint256"
      }
    ],
    name: "updateMinimumBalance",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "address"
      }
    ],
    name: "voted",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "voteDuration",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "registry",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getMemberCount",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "quorumCount",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_address",
        type: "address"
      }
    ],
    name: "isMember",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "votingPowerAgainst",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "minimumBalance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_token",
        type: "address"
      }
    ],
    name: "setERC20Token",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "bcde",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "proposalId",
        type: "uint256"
      },
      {
        indexed: false,
        name: "proposalType",
        type: "bytes32"
      },
      {
        indexed: false,
        name: "creator",
        type: "address"
      },
      {
        indexed: false,
        name: "addressValue",
        type: "address"
      },
      {
        indexed: false,
        name: "stringValue",
        type: "string"
      },
      {
        indexed: false,
        name: "numValue",
        type: "uint256"
      },
      {
        indexed: false,
        name: "endDate",
        type: "uint256"
      },
      {
        indexed: false,
        name: "voteQuorum",
        type: "uint256"
      }
    ],
    name: "ProposalStarted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "proposalId",
        type: "uint256"
      },
      {
        indexed: false,
        name: "voter",
        type: "address"
      },
      {
        indexed: false,
        name: "votingPower",
        type: "uint256"
      },
      {
        indexed: false,
        name: "vote",
        type: "bool"
      }
    ],
    name: "VoteRegistered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "proposalId",
        type: "uint256"
      },
      {
        indexed: false,
        name: "proposalType",
        type: "bytes32"
      },
      {
        indexed: false,
        name: "creator",
        type: "address"
      },
      {
        indexed: false,
        name: "addressValue",
        type: "address"
      },
      {
        indexed: false,
        name: "stringValue",
        type: "string"
      },
      {
        indexed: false,
        name: "numValue",
        type: "uint256"
      },
      {
        indexed: false,
        name: "endDate",
        type: "uint256"
      },
      {
        indexed: false,
        name: "voteQuorum",
        type: "uint256"
      },
      {
        indexed: false,
        name: "votingPowerFor",
        type: "uint256"
      },
      {
        indexed: false,
        name: "votingPowerAgainst",
        type: "uint256"
      },
      {
        indexed: false,
        name: "voteResult",
        type: "bool"
      }
    ],
    name: "VoteConcluded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "member",
        type: "address"
      }
    ],
    name: "MemberAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "member",
        type: "address"
      }
    ],
    name: "MemberRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "getRegistryAddress",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getEquityTokenAddress",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256"
      }
    ],
    name: "getProposal",
    outputs: [
      {
        components: [
          {
            name: "proposalId",
            type: "uint256"
          },
          {
            name: "proposalType",
            type: "bytes32"
          },
          {
            name: "proposer",
            type: "address"
          },
          {
            name: "addressValue",
            type: "address"
          },
          {
            name: "stringValue",
            type: "string"
          },
          {
            name: "numValue",
            type: "uint256"
          },
          {
            name: "endDate",
            type: "uint256"
          },
          {
            name: "voteQuorum",
            type: "uint256"
          },
          {
            name: "closed",
            type: "bool"
          }
        ],
        name: "",
        type: "tuple"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getProposalLength",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256"
      }
    ],
    name: "processProposal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_address",
        type: "address"
      },
      {
        name: "_stringValue",
        type: "string"
      },
      {
        name: "_numValue",
        type: "uint256"
      }
    ],
    name: "proposeAllOther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_member",
        type: "address"
      }
    ],
    name: "proposeAddMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_member",
        type: "address"
      }
    ],
    name: "proposeRemoveMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_amount",
        type: "uint256"
      },
      {
        name: "_stringValue",
        type: "string"
      }
    ],
    name: "proposeSendEther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_earningsRatePercent",
        type: "uint256"
      }
    ],
    name: "proposeSetEarningsRatePercent",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_minimumBalance",
        type: "uint256"
      }
    ],
    name: "proposeSetMinimumMemberEligibility",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_basePricePerCarat",
        type: "uint256"
      }
    ],
    name: "proposeSetPriceBase",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_pricePowerx100",
        type: "uint256"
      }
    ],
    name: "proposeSetPricePowerx100",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256"
      },
      {
        name: "_vote",
        type: "bool"
      }
    ],
    name: "vote",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256"
      }
    ],
    name: "getVotingPowerFor",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256"
      }
    ],
    name: "getVotingPowerAgainst",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256"
      }
    ],
    name: "concludeVote",
    outputs: [
      {
        name: "result",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
export default new web3.eth.Contract(abi, address);
