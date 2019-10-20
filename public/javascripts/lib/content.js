var randomTractatus = function() {
	return tractatus[Math.floor(Math.random()*tractatus.length)]
}

var tractatus = [
	"The world is everything that is the case.",
	"The world is the totality of facts, not of things.",
	"The world is determined by the facts, and by these being all the facts.",
	"For the totality of facts determines both what is the case, and also all that is not the case.",
	"The facts in logical space are the world.",
	"The world divides into facts.",
	"Any one can either be the case or not be the case, and everything else remain the same.",
	"What is the case, the fact, is the existence of atomic facts.",
	"An atomic fact is a combination of objects (entities, things).",
	"It is essential to a thing that it can be a constituent part of an atomic fact.",
	"In logic nothing is accidental: if a thing can occur in an atomic fact the possibility of that atomic fact must already be prejudged in the thing.",
	"It would, so to speak, appear as an accident, when to a thing that could exist alone on its own account, subsequently a state of affairs could be made to fit.",
	"If things can occur in atomic facts, this possibility must already lie in them.",
	"(A logical entity cannot be merely possible. Logic treats of every possibility, and all possibilities are its facts.)",
	"Just as we cannot think of spatial objects at all apart from space, or temporal objects apart from time, so we cannot think of any object apart from the possibility of its connexion with other things.",
	"If I can think of an object in the context of an atomic fact, I cannot think of it apart from the possibility of this context.",
	"The thing is independent, in so far as it can occur in all possible circumstances, but this form of independence is a form of connexion with the atomic fact, a form of dependence. (It is impossible for words to occur in two different ways, alone and in the proposition.)",
	"If I know an object, then I also know all the possibilities of its occurrence in atomic facts.",
	"(Every such possibility must lie in the nature of the object.)",
	"A new possibility cannot subsequently be found.",
	"In order to know an object, I must know not its external but all its internal qualities.",
	"If all objects are given, then thereby are all possible atomic facts also given.",
	"Every thing is, as it were, in a space of possible atomic facts. I can think of this space as empty, but not of the thing without the space.",
	"A spatial object must lie in infinite space. (A point in space is an argument place.)",
	"A speck in a visual field need not be red, but it must have a colour; it has, so to speak, a colour space round it. A tone must have a pitch, the object of the sense of touch a hardness, etc.",
	"Objects contain the possibility of all states of affairs.",
	"The possibility of its occurrence in atomic facts is the form of the object.",
	"The object is simple.",
	"Every statement about complexes can be analysed into a statement about their constituent parts, and into those propositions which completely describe the complexes.",
	"Objects form the substance of the world. Therefore they cannot be compound.",
	"If the world had no substance, then whether a proposition had sense would depend on whether another proposition was true.",
	"It would then be impossible to form a picture of the world (true or false).",
	"It is clear that however different from the real one an imagined world may be, it must have something—a form—in common with the real world.",
	"This fixed form consists of the objects.",
	"The substance of the world can only determine a form and not any material properties. For these are first presented by the propositions—first formed by the configuration of the objects.",
	"Roughly speaking: objects are colourless.",
	"Two objects of the same logical form are—apart from their external properties—only differentiated from one another in that they are different.",
	"Either a thing has properties which no other has, and then one can distinguish it straight away from the others by a description and refer to it; or, on the other hand, there are several things which have the totality of their properties in common, and then it is quite impossible to point to any one of them.",
	"For if a thing is not distinguished by anything, I cannot distinguish it—for otherwise it would be distinguished.",
	"Substance is what exists independently of what is the case.",
	"It is form and content.",
	"Space, time and colour (colouredness) are forms of objects.",
	"Only if there are objects can there be a fixed form of the world.",
	"The fixed, the existent and the object are one.",
	"The object is the fixed, the existent; the configuration is the changing, the variable.",
	"The configuration of the objects forms the atomic fact.",
	"In the atomic fact objects hang one in another, like the links of a chain.",
	"In the atomic fact the objects are combined in a definite way.",
	"The way in which objects hang together in the atomic fact is the structure of the atomic fact.",
	"The form is the possibility of the structure.",
	"The structure of the fact consists of the structures of the atomic facts.",
	"The totality of existent atomic facts is the world.",
	"The totality of existent atomic facts also determines which atomic facts do not exist.",
	"The existence and non-existence of atomic facts is the reality.",
	"(The existence of atomic facts we also call a positive fact, their non-existence a negative fact.)",
	"Atomic facts are independent of one another.",
	"From the existence of non-existence of an atomic fact we cannot infer the existence of non-existence of another.",
	"The total reality is the world.",
	"We make to ourselves pictures of facts.",
	"The picture presents the facts in logical space, the existence and non-existence of atomic facts.",
	"The picture is a model of reality.",
	"To the objects correspond in the picture the elements of the picture.",
	"The elements of the picture stand, in the picture, for the objects.",
	"The picture consists in the fact that its elements are combined with one another in a definite way.",
	"The picture is a fact.",
	"That the elements of the picture are combined with one another in a definite way, represents that the things are so combined with one another.",
	"This connexion of the elements of the picture is called its structure, and the possibility of this structure is called the form of representation of the picture.",
	"The form of representation is the possibility that the things are combined with one another as are the elements of the picture.",
	"Thus the picture is linked with reality; it reaches up to it.",
	"It is like a scale applied to reality.",
	"Only the outermost points of the dividing lines touch the object to be measured.",
	"According to this view the representing relation which makes it a picture, also belongs to the picture.",
	"The representing relation consists of the co-ordinations of the elements of the picture and the things.",
	"These co-ordinations are as it were the feelers of its elements with which the picture touches reality.",
	"In order to be a picture a fact must have something in common with what it pictures.",
	"In the picture and the pictured there must be something identical in order that the one can be a picture of the other at all.",
	"What the picture must have in common with reality in order to be able to represent it after its manner—rightly or falsely—is its form of representation.",
	"The picture can represent every reality whose form it has.",
	"The spatial picture, everything spatial, the coloured, everything coloured, etc.",
	"The picture, however, cannot represent its form of representation; it shows it forth.",
	"The picture represents its object from without (its standpoint is its form of representation), therefore the picture represents its object rightly or falsely.",
	"But the picture cannot place itself outside of its form of representation.",
	"What every picture, of whatever form, must have in common with reality in order to be able to represent it at all—rightly or falsely—is the logical form, that is, the form of reality.",
	"If the form of representation is the logical form, then the picture is called a logical picture.",
	"Every picture is also a logical picture. (On the other hand, for example, not every picture is spatial.)",
	"The logical picture can depict the world.",
	"The picture has the logical form of representation in common with what it pictures.",
	"The picture depicts reality by representing a possibility of the existence and non-existence of atomic facts.",
	"The picture represents a possible state of affairs in logical space.",
	"The picture contains the possibility of the state of affairs which it represents.",
	"The picture agrees with reality or not; it is right or wrong, true or false.",
	"The picture represents what it represents, independently of its truth or falsehood, through the form of representation.",
	"What the picture represents is its sense.",
	"In the agreement or disagreement of its sense with reality, its truth or falsity consists.",
	"In order to discover whether the picture is true or false we must compare it with reality.",
	"It cannot be discovered from the picture alone whether it is true or false.",
	"There is no picture which is a priori true."
]